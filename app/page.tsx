import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import img_1 from "../public/login.png";
import img_2 from "../public/change_password.png";
import img_3 from "../public/2fa.png";
import img_4 from "../public/2fa_qrcode.png";
import img_5 from "../public/2fa_otp.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="w-full max-w-4xl block h-auto py-9">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
        This is a demo of a Next.js project with Auth.js(NextAuth.js) for
        authentication.
      </h1>
      <h2 className="text-2xl font-semibold text-blue-500 text-center mb-4">
        Features
      </h2>
      <Card className="w-full max-w-[800px] mb-4 mx-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle>Page structure:</CardTitle>
          <CardDescription>There are total 8 pages</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>- &quot;/&quot; : Home page.</li>
            <li>- &quot;/login&quot; : Login page.</li>
            <li>- &quot;/register&quot; : User registration page.</li>
            <li>
              - &quot;/password-reset&quot; : A page for user who forgot there
              password to request password reset.
            </li>
            <li>
              - &quot;/update-password&quot;: A page for user to reset their
              password.
            </li>
            <li>
              - &quot;/my-account&quot;: User dashboard page.(For logged in
              user)
            </li>
            <li>
              - &quot;/change-password&quot;: A page for user to update
              password.(For logged in user)
            </li>
            <li>
              - &quot;/two-factor-auth&quot;: A page for user to enable or
              disable two factor authentication.(For logged in user)
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full max-w-[800px] mb-4 mx-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle>Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            - All forms are created by Shadcn Form(which use React Hook Form)
            component with zod validation
          </p>
          <p>- All functionality are performed by server actions.</p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-[800px] mb-4 mx-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle>Style</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            - Styling are mainly from Shadcn components and tailwind CSS classes.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-[800px] mb-4 mx-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle>User</CardTitle>
        </CardHeader>
        <CardContent>
          <p>- Non-user can create user account</p>
          <Image src={img_1} alt="user change password" className="py-2"/>
          <p>
            - Logged in user can change their password, enable / disable Google two factor
            authentication and reset password.
          </p>
          <Image src={img_2} alt="user change password" className="py-2"/>
          <Separator />
          <Image src={img_3} alt="user enable 2FA" className="py-2"/>
          <Separator />
          <Image src={img_4} alt="user 2FA QR-code" className="py-2"/>
          <Separator />
          <Image src={img_5} alt="user 2FA OTP" className="py-2"/>
        </CardContent>
      </Card>
      <Card className="w-full max-w-[800px] mb-4 mx-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle>Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>- Data of this project are linked to Neon database</p>
          <p>
            - Using Drizzle ORM for data schemas and interactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
