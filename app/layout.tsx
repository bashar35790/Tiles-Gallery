import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import "animate.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/homepage/footer/Footer";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
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
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased font-sans`}
      data-theme="light"
    >
      <body className="flex flex-col">
        <header className="">
          <Navbar></Navbar>
        </header>
        {children}
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html >
  );
}
