'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

export default function AdminLogin({ redirectTo = null }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) {
            toast.error("wait for response. or reload");
            return;
        }
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            setLoading(true);
            const formData = { username, password };
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            })
            const resData = await res.json();
            console.log(resData)
            if (resData.status === 200) {
           toast.success(resData?.message || "Success")
                window.location.href = redirectTo || '/admin'
            }else{
                toast.error(resData?.message ||"Error")
            }
        } catch {
            toast.error("Error occured.")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen text-black">
            <div className="w-full mt-10 mx-auto max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block font-medium text-zinc-700 dark:text-zinc-300">
                            Username
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="username"
                            placeholder="Enter username"
                            name="username"
                            type="text"
                            required
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block font-medium text-zinc-700 dark:text-zinc-300">
                            Password
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="password"
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            required
                        />
                        <div className="flex justify-end text-xs">
                            <a href="#" className="text-zinc-700 hover:underline dark:text-zinc-300">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Submit</button>
                </form>
            </div>
        </div>
    );
}
