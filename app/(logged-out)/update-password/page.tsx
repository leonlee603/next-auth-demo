import Link from "next/link";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokensSchema";
import UpdatePasswordForm from "./update-password-form";

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string;
  }>;
}) {
  let isTokenValid = false;

  const { token } = await searchParams;

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      isTokenValid = true;
    }
  }

  return (
    <main className="flex justify-center flex-1 py-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {isTokenValid
              ? "Update password"
              : "Your password reset link is invalid or has expired"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isTokenValid ? (
            <UpdatePasswordForm token={token ?? ""} />
          ) : (
            <Link className="underline" href="/password-reset">
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
