"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/navigation';
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
import { Checkbox } from "@/common/components/ui/checkbox";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import withGuest from "@/modules/auth/components/WithGuest";

const loginSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const { login, isLoginLoading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="font-roboto flex flex-col justify-center items-center min-h-screen p-8 pb-20 sm:p-20 bg-[#FAFAFB]">
      <div className="flex flex-col text-center items-center justify-center gap-3.5">
        <h1 className="text-[56px] font-bold text-[#44444F] font-poppin leading-[92px]">
          Sign In
        </h1>
        <p className="text-sm text-[#92929D]">
          Just sign in if you have an account in here. Enjoy our Website.
        </p>
      </div>
      <div className="bg-white shadow-[3px_-5px_40px_0px_#CDCDD41A] rounded-[20px] max-w-[560px] w-full p-8 mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=" "
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>Username</FormLabel>
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
                    <Input
                      type="password"
                      placeholder=" "
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>Enter Password</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-[#696974]">
                  Remember Me
                </label>
              </div>
              <a className="text-sm text-[#50B5FF] font-bold hover:underline" href="#">
                Forgot Password?
              </a>
            </div>
            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </div>
      <button onClick={() => router.push('/register')} className="text-[#0062FF] text-sm font-bold hover:underline mt-[35px]">
        Don&apos;t have an account? Register
      </button>
    </div>
  );
}

export default withGuest(LoginPage);