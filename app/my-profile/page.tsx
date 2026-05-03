"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";


type ProfileProps = {
    Name?: string;
    Email?: string;
    avatar?: string;
};

const Profile: React.FC<ProfileProps> = ({
    Name = "Julian Thorne",
    Email = "julian.thorne@architect-studio.com",
    avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCrvEMJ7eU7Jsl-0qXqM-vNir-Xp96taqtWm4deKT6ikOhZzyMXWH7ojjWefHRaPhqT7Q6fIiGkj2a_TUS111hL4xKqN4DjvAb4j0zNlLwlvfrwO2XiPi7lldX5QKDomq82VZ63JdTkQ6ZzX2aJdcM2x-CzTesCH4RjgPgew3Smt4oF_d5sYywzzYwJ9OTLn06I8S9Fp1Nc5KVpibcTwBebwgIXXmA46s0w7-r6ItrtKlCTSP1P_eUw2Z2NTuXXVahaA9S3gMcPr4Q", }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const loadSession = async () => {
            const { data } = await authClient.getSession();
            setSession(data?.user || null);
            setLoading(false);
        };

        loadSession();
    }, []);


    return (
        <>
            {
                loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                ) : session ? (
                    <main className="pt-20 pb-20 container mx-auto">

                        {/* Profile Header */}
                        <section className="mb-16 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#f9f9f9] p-8 rounded-lg shadow-sm">

                            <div className="flex items-center gap-6">
                                {/* Avatar */}
                                <div className="relative h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
                                    <Image
                                        src={session?.image || avatar}
                                        alt="Profile image"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 256px"
                                    />
                                </div>

                                <div className="text-center md:text-left">
                                    <p className="text-2xl uppercase font-light tracking-widest text-brand-secoundry">
                                        Professional Member
                                    </p>
                                    <h1 className="text-4xl font-bold text-brand-primari uppercase">{session?.name || Name}</h1>
                                    <p className="text-gray-600">{session?.email || Email}</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 bg-brand-primari text-white px-6 py-3 text-sm uppercase tracking-widest rounded-md hover:bg-gray-800">
                                Settings
                            </button>
                        </section>

                        {/* Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

                            <div className="p-6 border rounded-lg bg-gray-50 border-brand-primari">
                                <h3 className="text-sm uppercase text-gray-500">Saved Tiles</h3>
                                <p className="text-3xl font-bold text-brand-primari">24 Designs</p>
                            </div>

                            <div className="p-6 border rounded-lg bg-gray-50 border-brand-primari">
                                <h3 className="text-sm uppercase text-gray-500">Active Projects</h3>
                                <p className="text-3xl font-bold text-brand-primari">08 Sets</p>
                            </div>

                            <div className="p-6 border rounded-lg bg-gray-50 border-brand-primari">
                                <h3 className="text-sm uppercase text-gray-500">Samples Ordered</h3>
                                <p className="text-3xl font-bold text-brand-primari">12 Items</p>
                            </div>

                        </section>

                        {/* Update Form */}
                        <section className="max-w-3xl mx-auto">

                            <h2 className="text-2xl font-semibold text-center mb-10 text-brand-primari">
                                Account Settings
                            </h2>

                            <form className="space-y-8 bg-white p-8 border rounded-lg shadow-sm border-brand-primari">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm uppercase text-gray-500">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={session?.name || Name}
                                            className="border-b py-2 focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm uppercase text-gray-500">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={session?.email || Email}
                                            disabled
                                            className="border-b py-2 bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm uppercase text-gray-500">
                                        Profile Image URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/avatar.jpg"
                                        defaultValue={session?.image}
                                        className="border-b py-2 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm uppercase text-gray-500">
                                        Studio / Firm
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={session?.studio || "Thorne & Co. Architectural Studio"}
                                        className="border-b py-2 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-primari cursor-pointer transition-colors duration-300 text-white py-4 uppercase tracking-widest hover:bg-gray-800"
                                >
                                    Update Information
                                </button>

                            </form>
                        </section>

                    </main>
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-gray-500">No user session found.</p>
                    </div>
                )
            }

        </>

    );
};

export default Profile;
