"use client"

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    const links = <>
        <Link href={"/"} className={`${pathname === "/" ? "text-brand-primari font-semibold border-b-2 border-brand-primari" : "hover:text-brand-primari transition-colors"} uppercase`}>Home</Link>
        <Link href={"/all-tiles"} className={`${pathname === "/all-tiles" ? "text-brand-primari font-semibold border-b-2 border-brand-primari" : "hover:text-brand-primari transition-colors"} uppercase`}>All Tiles</Link>
        <Link href={"/my-profile"} className={`${pathname === "/my-profile" ? "text-brand-primari font-semibold border-b-2 border-brand-primari" : "hover:text-brand-primari transition-colors"} uppercase`}>My Profile</Link>
    </>

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh();
    };

    console.log(pathname);

    return (
        <nav className="bg-white shadow-sm text-brand-secoundry sticky top-0 z-50">
            <div className="navbar container mx-auto px-4 md:px-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-4 shadow-xl border border-slate-100 gap-3">
                            {links}
                        </ul>
                    </div>
                    <Link href={"/"} className="flex items-center">
                        <h1 className="text-2xl font-bold text-brand-primari">Tiles <span className="text-brand-secoundry">Gallery</span></h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8 font-medium">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-3 md:gap-5">
                    {isPending ? (
                        <div className="h-10 w-10 animate-pulse bg-slate-100 rounded-full"></div>
                    ) : session ? (
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link href="/my-profile" className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-md border-2 border-brand-primari/20 hover:border-brand-primari transition-all">
                                <Image
                                    src={session.user.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCrvEMJ7eU7Jsl-0qXqM-vNir-Xp96taqtWm4deKT6ikOhZzyMXWH7ojjWefHRaPhqT7Q6fIiGkj2a_TUS111hL4xKqN4DjvAb4j0zNlLwlvfrwO2XiPi7lldX5QKDomq82VZ63JdTkQ6ZzX2aJdcM2x-CzTesCH4RjgPgew3Smt4oF_d5sYywzzYwJ9OTLn06I8S9Fp1Nc5KVpibcTwBebwgIXXmA46s0w7-r6ItrtKlCTSP1P_eUw2Z2NTuXXVahaA9S3gMcPr4Q"}
                                    alt={session.user.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </Link>

                            <button
                                className="btn btn-sm md:btn-md btn-outline text-brand-primari rounded-lg hover:bg-brand-primari hover:border-brand-primari hover:text-white transition-all text-xs md:text-sm"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 md:gap-4">
                            <Link href={"/auth/signIn"}>
                                <button className="btn btn-sm md:btn-md btn-outline text-brand-primari border-brand-primari rounded-lg hover:bg-brand-primari hover:text-white transition-all text-xs md:text-sm px-3 md:px-6">
                                    Login
                                </button>
                            </Link>
                            <Link href={"/auth/resister"}>
                                <button className="btn btn-sm md:btn-md bg-brand-primari border-brand-primari text-white rounded-lg hover:bg-brand-secoundry hover:border-brand-secoundry transition-all text-xs md:text-sm px-3 md:px-6">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;