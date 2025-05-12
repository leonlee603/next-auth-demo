"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { db } from "@/db/drizzle";
import { passwordSchema } from "@/validation/passwordSchema";
import { users } from "@/db/usersSchema";

export const loginWithCredentials = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token?: string;
}) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
  });

  const loginValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginValidation.success) {
    return {
      error: true,
      message:
        loginValidation.error?.issues[0]?.message ?? "An error occurred.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      token,
      redirect: false,
    });
  } catch (e) {
    console.log(e);

    return {
      error: true,
      message: "Incorrect credentials",
    };
  }
};

export const preLoginCheck = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      error: true,
      message: "Incorrect email or password",
    };
  } else {
    const isPasswordCorrect = await compare(password, user.password!);
    if (!isPasswordCorrect) {
      return {
        error: true,
        message: "Incorrect email or password",
      };
    }
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
  };
};