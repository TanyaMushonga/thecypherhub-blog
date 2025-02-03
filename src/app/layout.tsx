import type { Metadata } from "next";
import Script from "next/script";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: "%s - The Cypher Hub newsletter",
    default: "The Cypher Hub newsletter",
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
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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
