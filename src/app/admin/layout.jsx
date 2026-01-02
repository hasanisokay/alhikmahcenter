"use client";
import AdminLogin from "@/components/admin/AdminLogin";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth-user", { credentials: "include" });
      const data = await res.json();
      setIsAdmin(data.status === 200);
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  if (loading) return <Loading />;
  if (!isAdmin) return <AdminLogin />;
  return (
    <div className="min-h-screen flex md:flex-row flex-col  bg-white text-black">
      {isAdmin && <Sidebar />}
      <main className="flex-1 p-6  mt-16 md:mt-0">{children}</main>
    </div>
  );
}
