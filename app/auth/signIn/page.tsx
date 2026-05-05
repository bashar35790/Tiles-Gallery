"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import SocialLogin from "@/utility/thirdPartyLogin/ThirdPartyLogin";
import {
    Button,
    Description,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";

const inputStyles =
    "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

const Login = () => {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setErrorMsg("");

        try {
            const formData = new FormData(e.currentTarget);

            const email = formData.get("email");
            const password = formData.get("password");

            if (typeof email !== "string" || typeof password !== "string") {
                setErrorMsg("Invalid form data");
                return;
            }

            const { error } = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
            });

            if (error) {
                setErrorMsg(error.message as string);
                return;
            }

            router.refresh();
            router.push("/");
        } catch {
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (sessionPending) return null;
    if (session) return null;

    return (
        <div className="py-12 md:py-16 mx-auto px-4">
            <div className="bg-brand-primari p-6 md:p-10 rounded-2xl max-w-2xl mx-auto flex flex-col justify-center items-center gap-5 shadow-2xl">
                {/* Header */}
                <div className="text-left space-y-2.5 w-full">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Welcome back</h2>
                    <p className="text-white/80 font-medium">Sign in to access your professional tiles gallery.</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">

                    {/* Email */}
                    <TextField isRequired>
                        <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`}
                        />
                        <FieldError className="text-red-300 text-xs mt-1" />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                    >
                        <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <Description className="text-white/60 text-[10px] uppercase tracking-wider mt-1 font-medium">At least 8 chars, 1 uppercase, 1 number</Description>
                        <FieldError className="text-red-300 text-xs mt-1" />
                    </TextField>

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl">
                            <p className="text-red-200 text-sm font-medium">{errorMsg}</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="submit"
                            className="bg-brand-secoundry text-white py-4 rounded-xl font-bold uppercase tracking-widest flex-1 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                            isDisabled={loading}
                        >
                            {!loading && <Check className="w-5 h-5" />}
                            {loading ? "Signing in..." : "Submit"}
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                            className="bg-white/10 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                            isDisabled={loading}
                        >
                            Reset
                        </Button>
                    </div>

                </form>

                <h4 className="text-white text-center font-bold">Or</h4>
                <SocialLogin />
                <div className="w-full flex gap-2 justify-center items-center mt-5">
                    <p className="text-white/80 text-sm font-medium">Don't have any account?</p>
                    <Link href="/auth/resister" className="text-white underline decoration-white/60 font-bold transition-all cursor-pointer">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
