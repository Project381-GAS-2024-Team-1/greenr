"use server";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
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
      confirmPassword: formData.get("confirmPassword")
    });

    if (!parsedData.success) {
      return { success: false, errors: parsedData.error.flatten().fieldErrors };
    }

    const { username, firstName, lastName, phone, email, password } =
      parsedData.data;

    const existingUser = await db.user.findUnique({
      where: { email }
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
        password: hashedPassword
      }
    });

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
}

export async function logIn(formData: FormData) {
  try {
    const parsedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    if (!parsedData.success) {
      return { success: false, errors: parsedData.error.errors };
    }

    const { email, password } = parsedData.data;

    const user = await db.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) return { success: false, message: "Invalid email or password" };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = await new SignJWT({ id: user.id, username: user.username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(new TextEncoder().encode(JWT_SECRET));

    cookies().set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });

    return {
      status: 200,
      success: true,
      message: "Logged in successfully!",
      redirectUrl: "/"
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
