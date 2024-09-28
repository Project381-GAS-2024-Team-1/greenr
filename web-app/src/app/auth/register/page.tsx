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

type RegisterFormInputs = {
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: FormData) => {
    await register(data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-14 lg:px-20 max-sm:px-5 gap-20 max-md:gap-10">
      <h1 className="col-span-2 text-4xl text-brand-tertiary">
        Getting Started
      </h1>
      <Card className="w-full">
        <Form {...form}>
          <form action={onSubmit} className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Sign Up
              </CardTitle>
              <CardDescription>
                Welcome to <span>greenr</span> please enter your details to get
                started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} />
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
                          placeholder="Your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Your Password"
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
