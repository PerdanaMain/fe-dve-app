import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusCircle, SquarePen } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { formEquipment } from "../../utils/schema";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { postEquipment } from "../../services/equipment.service";
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

const FormEquipment = ({ type, equipmentMutate }) => {
  const token = secureLocalStorage.getItem(STORAGE_KEY);
  const {
    register,
    handleSubmit,
    reset,
    control, // Tambahkan control untuk Select components
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formEquipment),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => postEquipment(data, token),
  });

  const hardwareTypes = [
    { name: "FIREWALL" },
    { name: "SERVER" },
    { name: "SWITCH" },
    { name: "ROUTER" }, // Perbaiki duplikasi SERVER
    { name: "GGSN" },
    { name: "DISCOVERY" },
  ];

  // Tambahkan data category yang terpisah
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
      toast.success(response.message);
      equipmentMutate();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
              <Button type="button" variant="outline" className="w-1/2">
                Cancel
              </Button>
              <Button type="submit" className="w-1/2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Please wait
                  </>
                ) : (
                  "Submit"
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
