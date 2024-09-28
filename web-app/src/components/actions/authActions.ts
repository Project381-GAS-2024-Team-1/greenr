"use server";
import { loginSchema, registerSchema } from "@/lib/schemas";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JWT_SECRET } from "@/lib/env";
import { db } from "@/lib/db";

let users: Array<{
  name: string;
  surname: string;
  email: string;
  password: string;
}> = [];

export async function register(formData: FormData) {
  try {
    const parsedData = registerSchema.safeParse({
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsedData.success) {
      return { success: false, errors: parsedData.error.errors };
    }

    const { username, firstName, lastName, phone, email, password } =
      parsedData.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        username,
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error); // Log the error for debugging
    return { success: false, message: "Something went wrong" };
  }
}

export async function login(formData: FormData) {
  try {
    const parsedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsedData.success) {
      return { success: false, errors: parsedData.error.errors };
    }

    const { email, password } = parsedData.data;

    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) return { success: false, message: "Invalid email or password" };
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return { success: false, message: "Invalid email or password" };

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    cookies().set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    redirect("/dashboard");
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
