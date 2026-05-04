"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.push("/my-profile");
        }
    }, [session, router]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image: data.Image,
            callbackURL: "/my-profile",
        });

        if (error) {
            alert(`Error: ${error.message}`);
            setLoading(false);
        } else {
            router.refresh();
            router.push("/my-profile");
        }
    };

    if (sessionPending) return null;
    if (session) return null;

    const inputStyles =
        "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

    return (
        <div className="py-12 md:py-16 mx-auto px-4">
            <div className="bg-brand-primari p-6 md:p-10 rounded-2xl max-w-2xl mx-auto flex flex-col justify-center items-center gap-5 shadow-2xl">
                <div className="text-left space-y-2.5 w-full">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Create account</h2>
                    <p className="text-white/80 font-medium">Join our community of professional designers and architects.</p>
                </div>
                <Form className="flex w-full flex-col gap-6 justify-start" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="name"
                    >
                        <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Full Name</Label>
                        <Input placeholder="Enter Your Name" className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`} />
                        <FieldError className="text-red-300 text-xs mt-1" />
                    </TextField>
                    
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                    >
                        <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Email Address</Label>
                        <Input
                            placeholder="Enter Your Email"
                            className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`}
                        />
                        <FieldError className="text-red-300 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="Image"
                    >
                        <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Profile Image URL</Label>
                        <Input placeholder="Enter Image URL" className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`} />
                        <FieldError className="text-red-300 text-xs mt-1" />
                    </TextField>

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

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button 
                            type="submit" 
                            className="bg-brand-secoundry text-white py-4 rounded-xl font-bold uppercase tracking-widest flex-1 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                            isDisabled={loading}
                        >
                            {!loading && <Check className="w-5 h-5" />}
                            {loading ? "Creating Account..." : "Submit"}
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
                </Form>
            </div>
        </div>
    );
};

export default SignUp;

