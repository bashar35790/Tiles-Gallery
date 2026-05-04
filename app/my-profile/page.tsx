"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProfileProps = {
    Name?: string;
    Email?: string;
    avatar?: string;
};

const Profile: React.FC<ProfileProps> = ({
    Name = "Julian Thorne",
    Email = "julian.thorne@architect-studio.com",
    avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCrvEMJ7eU7Jsl-0qXqM-vNir-Xp96taqtWm4deKT6ikOhZzyMXWH7ojjWefHRaPhqT7Q6fIiGkj2a_TUS111hL4xKqN4DjvAb4j0zNlLwlvfrwO2XiPi7lldX5QKDomq82VZ63JdTkQ6ZzX2aJdcM2x-CzTesCH4RjgPgew3Smt4oF_d5sYywzzYwJ9OTLn06I8S9Fp1Nc5KVpibcTwBebwgIXXmA46s0w7-r6ItrtKlCTSP1P_eUw2Z2NTuXXVahaA9S3gMcPr4Q", 
}) => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/signIn");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="loading loading-spinner loading-lg text-brand-primari"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    const user = session.user;

    return (
        <main className="py-12 md:py-20 container mx-auto px-4 md:px-6">
            {/* Profile Header */}
            <section className="mb-12 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    {/* Avatar */}
                    <div className="relative h-32 w-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ring-brand-primari/5">
                        <Image
                            src={user.image || avatar}
                            alt={user.name || "User"}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 128px, 160px"
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm md:text-base uppercase font-bold tracking-[0.2em] text-brand-primari">
                            Professional Member
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-secoundry uppercase tracking-tight">{user.name}</h1>
                        <p className="text-slate-500 font-medium">{user.email}</p>
                    </div>
                </div>

                <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-primari text-white px-8 py-4 text-sm uppercase font-bold tracking-widest rounded-xl hover:bg-brand-secoundry transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Settings
                </button>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                <div className="p-8 border rounded-2xl bg-white border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2">Saved Tiles</h3>
                    <p className="text-4xl font-black text-brand-secoundry group-hover:text-brand-primari transition-colors">24 <span className="text-lg font-medium text-slate-400">Designs</span></p>
                </div>

                <div className="p-8 border rounded-2xl bg-white border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2">Active Projects</h3>
                    <p className="text-4xl font-black text-brand-secoundry group-hover:text-brand-primari transition-colors">08 <span className="text-lg font-medium text-slate-400">Sets</span></p>
                </div>

                <div className="p-8 border rounded-2xl bg-white border-slate-100 shadow-sm hover:shadow-md transition-all group sm:col-span-2 md:col-span-1">
                    <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2">Samples Ordered</h3>
                    <p className="text-4xl font-black text-brand-secoundry group-hover:text-brand-primari transition-colors">12 <span className="text-lg font-medium text-slate-400">Items</span></p>
                </div>
            </section>

            {/* Update Form */}
            <section className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-2 mb-10 text-center">
                    <h2 className="text-3xl font-black text-brand-secoundry uppercase tracking-tight">
                        Account Settings
                    </h2>
                    <div className="h-1.5 w-20 bg-brand-primari rounded-full"></div>
                </div>

                <form className="space-y-8 bg-white p-6 md:p-10 border rounded-2xl shadow-xl border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user.name}
                                className="border-b-2 border-slate-100 py-3 focus:outline-none focus:border-brand-primari transition-colors font-medium text-brand-secoundry"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                                Email Address
                            </label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                disabled
                                className="border-b-2 border-slate-50 py-3 bg-slate-50 cursor-not-allowed font-medium text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                            Profile Image URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            defaultValue={user.image || ""}
                            className="border-b-2 border-slate-100 py-3 focus:outline-none focus:border-brand-primari transition-colors font-medium text-brand-secoundry"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                            Studio / Firm
                        </label>
                        <input
                            type="text"
                            defaultValue="Thorne & Co. Architectural Studio"
                            className="border-b-2 border-slate-100 py-3 focus:outline-none focus:border-brand-primari transition-colors font-medium text-brand-secoundry"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-secoundry cursor-pointer transition-all duration-300 text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-brand-primari shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-[0.98]"
                    >
                        Update Information
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Profile;

