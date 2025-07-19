import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/auth.service";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = ({ className, ...props }) => {
  const [registrationData, setRegistrationData] = useState(null);
  const {
    register: formRegistration,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => register(registrationData),
  });

  const onSubmit = async (data) => {
    try {
      setRegistrationData(data);
      console.log(registrationData);

      await mutateAsync();
      toast.success("Register succesfully, wait for admin approve!");
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Equipment Validate System</CardTitle>
          <CardDescription>
            Fill this fieldset to register into system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="fullname"
                  {...formRegistration("fullname")}
                />
                {errors.fullname?.message && (
                  <span className="text-red-500 text-[12px] italic">
                    {errors.fullname?.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  {...formRegistration("username")}
                />
                {errors.username?.message && (
                  <span className="text-red-500 text-[12px] italic">
                    {errors.username?.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...formRegistration("password")}
                />
                {errors.password?.message && (
                  <span className="text-red-500 text-[12px] italic">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirmation Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirmation Password"
                  {...formRegistration("confirmPassword")}
                />
                {errors.confirmPassword?.message && (
                  <span className="text-red-500 text-[12px] italic">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
