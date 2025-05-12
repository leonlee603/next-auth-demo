"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPen, KeyRound, LockOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/my-account", title: "About", icon: <UserPen /> },
  { href: "/change-password", title: "Change Password", icon: <KeyRound /> },
  { href: "/two-factor-auth", title: "2FA", icon: <LockOpen /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      {links.map((item) => {
        const className = cn("flex gap-2", "text-gray-700", {
          "text-blue-500": item.href === pathname,
        });
        return (
          <Link key={item.href} href={item.href} className={className}>
            {item.icon}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
