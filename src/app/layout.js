import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import getAdminFromCookies from "@/utils/getAdminFromCookies.mjs";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import getThemeCookie from "@/utils/getThemeCookie.mjs";
import { GoogleAnalytics } from "@next/third-parties/google";

import alhikmah from "@/../public/og-image.jpg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const siteUrl = "https://alhikmahbd.org";
  const title =
    "Al Hikmah Center – আল হিকমাহ রুকইয়াহ এন্ড হিজামা সেন্টার";
  const description =
    "Al Hikmah Ruqyah & Hijama Center provides authentic Islamic Ruqyah, Hijama (cupping therapy), and spiritual healing services in Bangladesh based on Qur'an & Sunnah.";
  const metaImage = `${siteUrl}${alhikmah.src}`;
  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },

    description,

    applicationName: siteName,

    metadataBase: new URL(siteUrl),

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Al Hikmah",
      "Al Hikmah Center",
      "Ruqyah Bangladesh",
      "Hijama Bangladesh",
      "Islamic Ruqyah",
      "Hijama Therapy",
      "Cupping Therapy",
      "আল হিকমাহ",
      "রুকইয়াহ",
      "হিজামা",
      "ইসলামিক চিকিৎসা",
      "সরাসরি রুকইয়াহ",
      "লাইভ রুকইয়াহ",
      "Ruqyah Center BD",
    ],

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName,
      title,
      description,
      images: [
        {
          // url: `${siteUrl}/og-image.jpg`,
          url:metaImage,
          width: 1200,
          height: 630,
          alt: "Al Hikmah Ruqyah & Hijama Center",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [metaImage],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    // viewport: {
    //   width: "device-width",
    //   initialScale: 1,
    //   maximumScale: 1,
    // },

    category: "health",
  };
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default async function RootLayout({ children }) {
  const isAdmin = await getAdminFromCookies();
  const storedTheme = await getThemeCookie();
  return (
    <html lang="en" 
    data-scroll-behavior="smooth"
        data-theme={storedTheme || "light"}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-white text-black`}
      >

          <AuthProvider adminDetailsFromCookie={isAdmin}>
         <div className="h-[64px] md:h-[80px]">
             <Navbar />
         </div>
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
           <GoogleAnalytics gaId="G-G8Z65RX4RL"  />
      </body>
    </html>
  );
}
