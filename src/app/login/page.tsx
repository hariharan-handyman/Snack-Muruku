"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Invalid credentials or access denied.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-alt px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-100 p-8">
                <div className="flex flex-col items-center mb-8">
                    <Image src="/logo.png" alt="Logo" width={48} height={48} className="mb-4" />
                    <h1 className="text-2xl font-bold text-primary uppercase tracking-tight">Admin Portal</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Identity</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                            placeholder="admin@handyman.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Access Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-secondary transition-all flex items-center justify-center uppercase tracking-widest text-xs"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Authenticate Access"}
                    </button>
                </form>
            </div>
            <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                Handyman Technologies • Secured System
            </p>
        </div>
    );
}
