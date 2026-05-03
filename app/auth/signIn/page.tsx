"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react";

const inputStyles =
    "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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


            router.push("/my-profile");
        } catch {
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16 mx-auto">
            <div className="bg-brand-primari p-10 rounded-2xl max-w-2xl flex flex-col justify-center items-center gap-5">
                {/* Header */}
                <div className="text-left space-y-2.5 w-full">
                    <h2 className="text-5xl text-white">Welcome back</h2>
                    <p>Sign in to access your tiles gallery.</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">

                    {/* Email */}
                    <TextField isRequired>
                        <Label>Email</Label>
                        <Input
                            name="email" // ✅ important
                            type="email"
                            placeholder="john@example.com"
                            className={inputStyles}
                        />
                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className={inputStyles}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-2 text-sm text-gray-600 cursor-pointer"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <Description className="text-brand-secoundry/80">Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>

                    {/* Error Message */}
                    {errorMsg && (
                        <p className="text-red-500 text-sm">{errorMsg}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            className="bg-brand-secoundry text-white"
                            isDisabled={loading}
                        >
                            <Check />
                            {loading ? "Signing in..." : "Submit"}
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                            isDisabled={loading}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
