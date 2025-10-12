import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import getAdminFromCookies from "@/utils/getAdminFromCookies.mjs";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al Hikmah Center-আল হিকমাহ রুকইয়াহ এন্ড হিজামা সেন্টার",
  description: "al hikmah ruqyah & hijama center-আল হিকমাহ রুকইয়াহ এন্ড হিজামা সেন্টার",
};

export default async function RootLayout({ children }) {
  const isAdmin = await getAdminFromCookies();
  const nodeEnv = process.env.NODE_ENV;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {nodeEnv === "production" ? (
          <UnderConstruction />
        ) : (
          <AuthProvider adminDetailsFromCookie={isAdmin}>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
