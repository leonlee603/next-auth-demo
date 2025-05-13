import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!!session?.user?.id) {
    redirect("/my-account");
  }

  return (
    <div className="w-full max-w-4xl block h-auto">
      <div className="flex">{children}</div>
    </div>
  );
}
