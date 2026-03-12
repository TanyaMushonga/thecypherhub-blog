import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Tanya's Blog",
    default: "Tanya's Blog - Tech Insights & Programming",
  },
  description:
    "Tanya's Blog delivers in-depth programming tutorials, software engineering insights, and cutting-edge technology analysis. Stay ahead with expert guides on web development, cloud computing, DevOps, and modern tech stacks.",
  keywords: [
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Vue.js",
    "Angular",
    "Svelte",
    "Go",
    "Rust",
    "Java",
    "C++",
    "C#",
    "Swift",
    "Kotlin",
    "Django",
    "Flask",
    "Spring Boot",
    "Express.js",
    "NestJS",
    "Laravel",
    "Ruby on Rails",

    "web development",
    "frontend development",
    "backend development",
    "full stack development",
    "responsive design",
    "web performance",
    "SEO optimization",
    "web accessibility",
    "progressive web apps",
    "single page applications",
    "server-side rendering",

    "AWS",
    "Azure",
    "Google Cloud",
    "cloud computing",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "DevOps",
    "infrastructure as code",
    "serverless",
    "microservices",
    "Terraform",
    "Ansible",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI",

    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "SQL",
    "NoSQL",
    "database design",
    "data modeling",
    "database optimization",

    "artificial intelligence",
    "machine learning",
    "deep learning",
    "AI programming",
    "TensorFlow",
    "PyTorch",
    "OpenAI",
    "LLM",
    "generative AI",
    "computer vision",
    "natural language processing",

    "software architecture",
    "design patterns",
    "clean code",
    "test-driven development",
    "agile methodology",
    "software testing",
    "code review",
    "refactoring",
    "system design",
    "distributed systems",
    "API design",
    "REST APIs",
    "GraphQL",

    "Git",
    "VS Code",
    "IntelliJ",
    "Visual Studio",
    "terminal",
    "command line",
    "Linux",
    "bash scripting",
    "npm",
    "yarn",
    "pnpm",
    "webpack",
    "Vite",

    "React Native",
    "Flutter",
    "iOS development",
    "Android development",
    "mobile app development",
    "cross-platform development",

    "web security",
    "cybersecurity",
    "authentication",
    "authorization",
    "OAuth",
    "JWT",
    "SSL/TLS",
    "encryption",
    "ethical hacking",

    "programming tutorials",
    "coding bootcamp",
    "tech career",
    "developer skills",
    "software engineer salary",
    "tech interview preparation",
    "portfolio building",

    "technology trends",
    "tech news",
    "software development",
    "programming blog",
    "coding tips",
    "developer tools",
    "tech innovation",
    "digital transformation",
  ],
  authors: [
    { name: "Tanya's Blog" },
    {
      name: "Tanyaradzwa Tanatswa Mushonga",
      url: "https://www.tanyaradzwatmushonga.me/",
    },
  ],
  creator: "Tanya's Blog",
  publisher: "Tanya's Blog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://blog.tanyaradzwatmushonga.me"),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.tanyaradzwatmushonga.me/",
    siteName: "Tanya's Blog",
    title: "Tanya's Blog - Tech Insights & Programming",
    description:
      "Expert programming tutorials, software engineering insights, and cutting-edge technology analysis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanya's Blog - Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanya's Blog - Tech Insights & Programming",
    description:
      "Expert programming tutorials, software engineering insights, and cutting-edge technology analysis.",
    images: ["/og-image.png"],
    creator: "@TanyaMushonga_",
    site: "@TanyaMushonga_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://blog.tanyaradzwatmushonga.me/",
    languages: {
      "en-US": "https://blog.tanyaradzwatmushonga.me/",
    },
  },
  category: "Technology",
  applicationName: "Tanya's Blog",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "_cuUK8FcUd9DgVvRvcC22LZZ29FoD-6lI5mOX2iRhYE",
    other: {
      "google-site-verification": ["google9884af7e75ae101d.html"],
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Tanya's Blog",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>

        <link rel="icon" href="/favicon.ico" sizes="any" />
      
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tanya's Blog",
              url: "https://blog.tanyaradzwatmushonga.me/",
              description:
                "A programming blog and tech newsletter delivering expert insights on software development, cloud computing, and modern technology trends.",
              publisher: {
                "@type": "Organization",
                name: "Tanya's Blog",
                logo: {
                  "@type": "ImageObject",
                  url: "https://blog.tanyaradzwatmushonga.me/logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://blog.tanyaradzwatmushonga.me/",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Google Analytics */}
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

        {/* Microsoft Clarity (Optional - for heatmaps & session recordings) */}
        {process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID}");
              `,
            }}
          />
        )}

        {/* Main Content */}
        <div className="min-h-screen flex flex-col">
          {children}
          <SpeedInsights />
          <Analytics />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "14px",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "hsl(var(--primary))",
                  secondary: "hsl(var(--primary-foreground))",
                },
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
