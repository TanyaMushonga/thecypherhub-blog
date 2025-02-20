import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const NavBar = dynamic(() => import("@/components/common/NavBar"));
const Footer = dynamic(() => import("@/components/common/footer"));

export const metadata: Metadata = {
  title: {
    template: "%s - The Cypher Hub newsletter",
    default: "The Cypher Hub newsletter",
  },
  description:
    "This is a newsletter for developers who want to stay updated with the latest trends in the tech industry.",
  twitter: {
    card: "summary_large_image",
    creator: "@thecypherhub",
    site: "@thecypherhub",
  },
  category: "Technology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          async
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
          async
        />{" "}
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
