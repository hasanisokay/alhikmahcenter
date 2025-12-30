import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import getAdminFromCookies from "@/utils/getAdminFromCookies.mjs";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import getThemeCookie from "@/utils/getThemeCookie.mjs";

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
  const storedTheme = await getThemeCookie();
  return (
    <html lang="en" 
    data-scroll-behavior="smooth"
        data-theme={storedTheme || "light"}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

          <AuthProvider adminDetailsFromCookie={isAdmin}>
         <div className="h-[64px] md:h-[80px]">
             <Navbar />
         </div>
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
      </body>
    </html>
  );
}
