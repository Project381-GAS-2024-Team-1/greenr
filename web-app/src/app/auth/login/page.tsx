"use client";

import { loginSchema } from "@/lib/schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "@/components/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  });

  const { toast } = useToast();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await logIn(formData);

      if (response.redirectUrl) window.location.href = response.redirectUrl;

      toast({
        title: response.success ? "Success" : "Error",
        description: response.message,
        variant: response.success ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-14 lg:px-20 max-sm:px-5 gap-20 max-md:gap-10">
      <h1 className="col-span-2 text-4xl text-brand-tertiary">Welcome Back</h1>
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Log In
              </CardTitle>
              <CardDescription>
                Welcome back, please enter your details to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 grid-cols-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2">
                <div>
                  <Button type="submit">Log In</Button>
                </div>
                <div className="flex gap-1">
                  <p>Don't have an account?</p>
                  <Link href="/auth/register" className="text-brand-tertiary">
                    Register
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
