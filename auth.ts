import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { authenticator } from "otplib";

import { db } from "./db/drizzle";
import { users } from "./db/usersSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        token: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          throw new Error("Incorrect credentials");
        } else {
          const isPasswordCorrect = await compare(
            credentials.password as string,
            user.password!
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect credentials");
          }

          if (user.twoFactorActivated) {
            const isTokenValid = authenticator.check(
              credentials.token as string,
              user.twoFactorSecret ?? ""
            );

            if (!isTokenValid) {
              throw new Error("Incorrect OTP");
            }
          }
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],
});
