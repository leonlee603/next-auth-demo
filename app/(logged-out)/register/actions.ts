"use server";

import { z } from "zod";
import { hash } from "bcryptjs";

import { db } from "@/db/drizzle";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { users } from "@/db/schema";
import { NeonDbError } from "@neondatabase/serverless";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const newUserSchema = z
      .object({
        email: z.string().email(),
      })
      .and(passwordMatchSchema);

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.flatten().fieldErrors,
      };
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return {
      error: true,
      message:
        (error as NeonDbError)?.code === "23505"
          ? {
              email: [
                "An account is already registered with that email address.",
              ],
            }
          : { other: ["An error occurred."] },
    };
  }
};
