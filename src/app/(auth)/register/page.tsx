"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import withGuest from "@/modules/auth/components/WithGuest";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterPage() {
  const router = useRouter();
  const { register, isRegisterLoading } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    register({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="font-roboto flex flex-col justify-center items-center min-h-screen p-8 pb-20 sm:p-20 bg-[#FAFAFB]">
      <div className="flex flex-col text-center items-center justify-center gap-3.5">
        <h1 className="text-[56px] font-bold text-[#44444F] font-poppin leading-[92px]">
          Register
        </h1>
        <p className="text-sm text-[#92929D]">
          Create an account to start managing your checklists.
        </p>
      </div>
      <div className="bg-white shadow-[3px_-5px_40px_0px_#CDCDD41A] rounded-[20px] max-w-[560px] w-full p-8 mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col"
          >
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input placeholder=" " {...field} />
                    </FormControl>
                    <FormLabel>Username</FormLabel>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder=" " {...field} />
                  </FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input type="password" placeholder=" " {...field} />
                    </FormControl>
                    <FormLabel>Password</FormLabel>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input type="password" placeholder=" " {...field} />
                    </FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] pt-4">
              <Button
                variant={"outline"}
                type="button"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default withGuest(RegisterPage);
