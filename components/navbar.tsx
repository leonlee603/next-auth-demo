import Link from "next/link";
import LogoutButton from "@/app/(logged-in)/logout-button";
import { Button } from "./ui/button";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="bg-slate-100 flex justify-center p-4">
      <div className="w-full max-w-4xl flex justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="text-blue-700 font-bold">Next Auth Demo</Link>
          </li>
        </ul>
        <div>
          {isLoggedIn ? (
            <div className="flex flex-row gap-2">
              <Button asChild size="sm" variant="secondary">
                <Link href="/my-account">My Account</Link>
              </Button>
              <LogoutButton />
            </div>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
