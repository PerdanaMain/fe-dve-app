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
    reset,
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
      
      reset(); // Reset form after successful login
      navigate("/dashboard");
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-white",
        className
      )}
      style={{ minHeight: "100vh", minWidth: "100vw", overflow: "hidden" }}
      {...props}
    >
      <Toaster />
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src="/assets/logo.jpeg" alt="logo" className="w-24 h-24 rounded-full" />
          <CardTitle className="text-lg font-semibold text-center">Data Center Validate Equipment</CardTitle>
          <CardDescription className="text-center text-xs">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-xs">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                {...formLogin("username")}
                className="mt-1"
              />
              {errors.username?.message && (
                <span className="text-red-500 text-xs italic">
                  {errors.username?.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...formLogin("password")}
                className="mt-1"
              />
              {errors.password?.message && (
                <span className="text-red-500 text-xs italic">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="text-center text-xs mt-2">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-2">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
