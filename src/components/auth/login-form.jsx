import { cn } from "../../lib/utils";
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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { loginSchema } from "../../utils/schema";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { STORAGE_KEY } from "../../utils/env";

export function LoginForm({ className, ...props }) {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const {
    register: formLogin,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data) => login(data),
  });

  const onSubmit = async (data) => {
    try {
      setIsloading(!isLoading);

      const response = await mutateAsync(data);
      secureLocalStorage.setItem(STORAGE_KEY, response.data);

      navigate("/dashboard");
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
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  {...formLogin("username")}
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
                  required
                  placeholder="password"
                  {...formLogin("password")}
                />
                {errors.password?.message && (
                  <span className="text-red-500 text-[12px] italic">
                    {errors.password?.message}
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
                    "Login"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
