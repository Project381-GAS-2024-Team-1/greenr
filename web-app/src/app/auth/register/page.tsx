"use client";

import { registerSchema } from "@/lib/schemas";
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
import { register } from "@/components/actions/authActions";
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

type RegisterFormInputs = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit"
  });

  const { toast } = useToast();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const response = await register(formData);

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
      <h1 className="col-span-2 text-4xl text-brand-tertiary">
        Getting Started
      </h1>
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Sign Up
              </CardTitle>
              <CardDescription>
                Welcome to <span>greenr</span>, please enter your details to get
                started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Username"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your First Name"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Last Name"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Phone Number"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your Password"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Your Password"
                          {...field}
                          className={fieldState.error ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2">
                <div>
                  <Button type="submit">Register</Button>
                </div>
                <div className="flex gap-1">
                  <p>Already have an account?</p>
                  <Link href="/auth/login" className="text-brand-tertiary">
                    Log In
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
