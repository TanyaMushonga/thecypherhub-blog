import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s - The Cypher Hub newsletter",
    default: "The Cypher Hub newsletter",
  },
  description:
    "The cypher hub is a newsletter for developers who want to stay updated with the latest trends in the tech industry.",
  twitter: {
    card: "summary_large_image",
    creator: "@thecypherhub",
    site: "@thecypherhub",
  },
  alternates: {
    canonical: "https://www.thecypherhub.tech/",
  },
  category: "Technology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="_cuUK8FcUd9DgVvRvcC22LZZ29FoD-6lI5mOX2iRhYE"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="google9884af7e75ae101d.html"
        />
        <link rel="canonical" href={`https://www.thecypherhub.tech/`} />
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
        />
        <div className="">
          {children}
          <SpeedInsights />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
