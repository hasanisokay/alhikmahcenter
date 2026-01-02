'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin({ redirectTo = null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      toast.error("Wait for response or reload");
      return;
    }

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const resData = await res.json();

      if (resData.status === 200) {
        toast.success(resData?.message || "Success");
        window.location.href = redirectTo || "/admin";
      } else {
        toast.error(resData?.message || "Error");
      }
    } catch {
      toast.error("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto pt-10 w-full max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="space-y-2 text-sm">
            <label
              htmlFor="username"
              className="block font-medium text-gray-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Enter username"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-1 focus-visible:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2 text-sm">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter password"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-1 focus-visible:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

            <div className="flex justify-end text-xs">
              <a
                href="#"
                className="text-gray-500 hover:underline dark:text-zinc-300"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 disabled:opacity-60 dark:bg-sky-700 dark:hover:bg-sky-600"
          >
            {loading ? "Signing in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
