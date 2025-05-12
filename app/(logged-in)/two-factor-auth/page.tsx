import { auth } from "@/auth";
import { eq } from "drizzle-orm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TwoFactorAuthForm from "./two-factor-auth-form";
import { db } from "@/db/drizzle";
import { users } from "@/db/usersSchema";

export default async function TwoFactorAuthPage() {
  const session = await auth();

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, parseInt(session!.user!.id!)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <TwoFactorAuthForm
          twoFactorActivated={user.twoFactorActivated ?? false}
        />
      </CardContent>
    </Card>
  );
}
