import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_METADATA } from "@/lib/constants";

const averta = localFont({
  src: [
    {
      path: "../public/fonts/Averta-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Averta-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Averta-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-averta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anhkhoatqt11.github.io/demnguockithi"),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon/apple-icon.png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Đếm ngược THPT 2027",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "THPT 2027",
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/images/background3.png",
        width: 1200,
        height: 630,
        alt: SITE_METADATA.title,
      },
    ],
  },
};

import { BackgroundProvider } from "@/components/countdown/background-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`dark ${averta.variable}`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col antialiased">
        <BackgroundProvider>{children}</BackgroundProvider>
      </body>
    </html>
  );
}
