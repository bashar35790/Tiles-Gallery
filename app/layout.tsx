import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";


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
      data-theme="light"
    >
      <body className="min-h-full flex flex-col">
        <header>
          <Navbar></Navbar>
        </header>

        {children}
      </body>
    </html >
  );
}
