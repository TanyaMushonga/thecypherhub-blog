import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/ui/floating-dock";
import { items } from "@/constants";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The dev cycle newsletter",
  description:
    "This is a newsletter for developers who want to stay updated with the latest trends in the tech industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground">
          <div className="flex flex-col items-center pt-5 md:text-3xl text-xl font-semibold md:font-bold border-b-accent border-b-2 pb-4">
            <h1 className="text-white">
              <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-600 via-violet-500 to-blue-100 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className=""> The Dev Cycle Newsletter.</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-700 via-violet-500 to-blue-100 py-4">
                  <span className=""> The Dev Cycle Newsletter.</span>
                </div>
              </div>
            </h1>
          </div>
          <div className="md:mt-5">
            <FloatingDock
              items={items}
              desktopClassName="w-fit bg-card"
              mobileClassName="w-fit p-5"
            />
          </div>
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
