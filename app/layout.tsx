import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";

const PlayfairFont = Playfair_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Tiles Gallery",
  description: "Tiles Gallery is primium tiles shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${PlayfairFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <Navbar
            brand={
              <div className="flex items-center gap-2">
                <Link href={"/"}>

                  <Image
                    src={Logo}
                    alt="Logo"
                    width={120}
                    height={60}
                    loading="eager"
                    className="h-auto w-auto"
                  />
                </Link>
              </div>
            }

            items={[
              { label: "Home", href: "/" },
              { label: "All Tiles", href: "/all-tiles" },
              { label: "My-Profile", href: "/my-profile" },
            ]}

            rightContent={
              <>
                <Link href="/auth/signIn"><Button variant="outline" className={"rounded-sm"}>Login</Button></Link>
                <Link href="/auth/resister"> <Button className={"bg-[#028C8D] rounded-sm"}>Sign Up</Button></Link>

              </>
            }
          />
        </header>
        {children}
      </body>
    </html>
  );
}
