"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./actions";

export default function LogoutButton() {
  return (
    <Button
      className="cursor-pointer"
      size="sm"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
