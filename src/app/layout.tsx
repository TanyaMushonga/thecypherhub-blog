import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: "%s - The dev cycle newsletter",
    default: "The dev cycle newsletter",
  },
  description:
    "This is a newsletter for developers who want to stay updated with the latest trends in the tech industry.",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <NavBar />
          <div className="pt-10"> {children}</div>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
