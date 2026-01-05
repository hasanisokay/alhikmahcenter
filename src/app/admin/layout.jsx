"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth-user", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setIsAdmin(data.user?.role === "admin");
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/login");
    }
  }, [loading, isAdmin, router]);

  if (loading) return <Loading />;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-white text-black">
      <Sidebar />
      <main className="flex-1 md:p-6 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}
