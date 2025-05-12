import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="w-full max-w-4xl block h-auto">
      <div className="flex h-full">
        <div className="p-4 pl-2 pt-5 border-r-1 w-full max-w-[200px]"><Sidebar /></div>
        <div className="flex-1 py-4 pl-4">{children}</div>
      </div>
    </div>
  );
}
