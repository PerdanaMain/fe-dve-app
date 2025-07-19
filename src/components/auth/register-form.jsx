import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "../../lib/utils";
import { register } from "../../services/auth.service";
import { registerSchema } from "../../utils/schema";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const RegisterForm = ({ className, ...props }) => {
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
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
      setIsloading(!isLoading);
      setRegistrationData(data);

      await mutateAsync();
      toast.success("Register succesfully, wait for admin approve!");
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account? {" "}
              <a href="/" className="underline underline-offset-4">
                sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
