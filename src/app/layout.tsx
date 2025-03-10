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
    "The cypher hub is a newsletter for developers who want to stay updated with the latest trends in the tech industry.",
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
  keywords: [
    "latest trends in web development",
    "how to build mobile applications",
    "best practices for DevOps engineers",
    "getting started with AWS services",
    "social life of software developers",
    "top React frameworks for developers",
    "popular Python frameworks for web development",
    "cyber security tips for developers",
    "how to secure your web applications",
    "best tools for mobile app development",
    "introduction to cloud computing with AWS",
    "how to manage DevOps pipelines",
    "latest updates in React ecosystem",
    "how to use Python for web development",
    "best practices for cyber security",
    "how to improve web application performance",
    "top tools for DevOps automation",
    "how to build scalable web applications",
    "best practices for mobile app security",
    "how to get started with React",
    "introduction to Python web frameworks",
    "how to secure your mobile applications",
    "best practices for AWS security",
    "how to manage cloud infrastructure",
    "latest trends in mobile app development",
    "how to use DevOps tools effectively",
    "best practices for web development",
    "how to build secure web applications",
    "top tools for web developers",
    "how to get started with DevOps",
    "introduction to AWS cloud services",
    "how to improve mobile app performance",
    "best practices for React development",
    "how to use Python for data science",
    "top frameworks for web development",
    "how to secure your cloud infrastructure",
    "best practices for mobile app development",
    "how to manage DevOps workflows",
    "latest updates in AWS services",
    "how to build responsive web applications",
    "best tools for Python developers",
    "how to get started with mobile development",
    "introduction to cyber security for developers",
    "how to use React for web development",
    "best practices for cloud security",
    "how to manage web development projects",
    "latest trends in software development",
    "how to build scalable mobile applications",
    "best tools for DevOps engineers",
    "how to secure your web applications",
  ],
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
        <meta name="robots" content="index, follow" />
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
