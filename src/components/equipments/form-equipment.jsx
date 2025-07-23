import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusCircle, SquarePen } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { formEquipment } from "../../utils/schema";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { postEquipment, putEquipment } from "../../services/equipment.service";
import toast, { Toaster } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/env";
import { useState } from "react";

const FormEquipment = ({ type, equipmentMutate, equipment = {} }) => {
  const token = secureLocalStorage.getItem(STORAGE_KEY);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formEquipment),
    defaultValues: {
      hostname: equipment.hostname ?? "",
      brand: equipment.brand ?? "",
      type: equipment.type ?? "",
      serialnumber: equipment.serialnumber ?? "",
      function: equipment.function ?? "",
      category: equipment.category ?? "",
      group: equipment.group ?? "",
    },
  });

  // PERBAIKAN 1: Pastikan mutationFn mengembalikan Promise yang benar
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      if (type === "create") {
        return await postEquipment(data, token);
      } else {
        return await putEquipment(equipment.id, data, token);
      }
    },
  });

  const hardwareTypes = [
    { name: "FIREWALL" },
    { name: "SERVER" },
    { name: "SWITCH" },
    { name: "ROUTER" },
    { name: "GGSN" },
    { name: "DISCOVERY" },
  ];

  const categoryTypes = [
    { name: "SERVER" },
    { name: "SWITCH" },
    { name: "FIREWALL" },
  ];

  const coreTypes = [{ name: "CORE" }, { name: "IT" }, { name: "IN" }];

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync({
        ...data,
        function_name: data.function,
      });
      
      reset();
      setDialogOpen(false);
      toast.success(response?.message || "Operation successful");
      
      if (equipmentMutate) {
        equipmentMutate();
      }
      
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  // Status loading gabungan
  const isLoading = isPending

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <Button
          variant={type === "create" ? "outline" : "none"}
          className="flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          {type === "create" ? (
            <>
              <PlusCircle className="w-4 h-4" />
              Add New
            </>
          ) : (
            <>
              <SquarePen className="w-4 h-4" />
              Update
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "New Equipment Form" : "Update Equipment Form"}
          </DialogTitle>
          <DialogDescription>
            {type === "create" 
              ? "Fill in the details to add new equipment."
              : "Make changes to your equipment here. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="hostname" className="font-semibold">
                Hostname
              </Label>
              <Input
                id="hostname"
                name="hostname"
                placeholder="Input hostname..."
                {...register("hostname")}
                className="rounded-md"
                disabled={isLoading}
              />
              {errors.hostname && (
                <span className="text-red-500 text-xs">
                  {errors.hostname.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand" className="font-semibold">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Input brand..."
                {...register("brand")}
                className="rounded-md"
                disabled={isLoading}
              />
              {errors.brand && (
                <span className="text-red-500 text-xs">
                  {errors.brand.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type" className="font-semibold">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                placeholder="Input type..."
                {...register("type")}
                className="rounded-md"
                disabled={isLoading}
              />
              {errors.type && (
                <span className="text-red-500 text-xs">
                  {errors.type.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="serialnumber" className="font-semibold">
                Serial Number
              </Label>
              <Input
                id="serialnumber"
                name="serialnumber"
                placeholder="Input serial number..."
                {...register("serialnumber")}
                className="rounded-md"
                disabled={isLoading}
              />
              {errors.serialnumber && (
                <span className="text-red-500 text-xs">
                  {errors.serialnumber.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="function" className="font-semibold">
                Select Function
              </Label>
              <Controller
                name="function"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full rounded-md">
                      <SelectValue placeholder="Select a function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-gray-500 text-xs">
                          Functions
                        </SelectLabel>
                        {hardwareTypes.map((item, index) => (
                          <SelectItem value={item.name} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.function && (
                <span className="text-red-500 text-xs">
                  {errors.function.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category" className="font-semibold">
                Select Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full rounded-md">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-gray-500 text-xs">
                          Categories
                        </SelectLabel>
                        {categoryTypes.map((item, index) => (
                          <SelectItem value={item.name} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className="text-red-500 text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="core" className="font-semibold">
                Select Core
              </Label>
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full rounded-md">
                      <SelectValue placeholder="Select a core" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-gray-500 text-xs">
                          Cores
                        </SelectLabel>
                        {coreTypes.map((item, index) => (
                          <SelectItem value={item.name} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.group && (
                <span className="text-red-500 text-xs">
                  {errors.group.message}
                </span>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                type="button"
                variant="outline" 
                className="w-1/2"
                onClick={() => setDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button type="submit" className="w-1/2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Please wait
                  </>
                ) : type === "create" ? (
                  "Submit Form"
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEquipment;