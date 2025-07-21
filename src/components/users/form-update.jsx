import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/env";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../utils/schema";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/admin.service";

const UpdateUserDialog = ({ data, open, onOpenChange }) => {
  const token = secureLocalStorage.getItem(STORAGE_KEY);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      isActive: data?.isActive ? "activate" : "deactivate",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => updateUser(data, token),
    onSuccess: () => {
      // Close dialog on success
      onOpenChange(false);
      // Reset form
      reset();
    },
    onError: (error) => {
      console.error("Update failed:", error);
      // Handle error (show toast, etc.)
    },
  });

  const onSubmit = async (formData) => {
    try {
      const updateData = {
        id: data.id,
        isActive: formData.isActive === "activate",
      };

      await mutateAsync(updateData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-6">
            <Label htmlFor="name-1">Choose User Activation</Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="activate" id="activate" />
                    <Label htmlFor="activate">Activate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deactivate" id="deactivate" />
                    <Label htmlFor="deactivate">Deactivate</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.isActive && (
              <p className="text-red-500 text-sm">{errors.isActive.message}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
