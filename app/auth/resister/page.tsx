"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: respon, error } = await authClient.signUp.email({
            name: data.name, // required
            email: data.email, // required
            password: data.password, // required
            image: data.Image, // required
            callbackURL: "/",
        });

        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            router.push("/");
        }
    };

    const inputStyles =
        "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

    return (
        <>
            <div className="py-16 mx-auto">
                <div className="bg-brand-primari p-10 rounded-2xl max-w-2xl flex flex-col justify-center items-center gap-5">
                    <div className="text-left space-y-2.5">
                        <h2 className="text-5xl text-white text-left">Create your account</h2>
                        <p>Save tiles, build your collection, manage your profile.</p>
                    </div>
                    <Form className="flex w-full flex-col gap-6 justify-start" onSubmit={onSubmit}>
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>Name</Label>
                            <Input placeholder="Enter Your Name" className={inputStyles} />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input
                                placeholder="Enter You Eamil"
                                className={inputStyles}

                            />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            name="Image"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>Image</Label>
                            <Input placeholder="Enter Image URL" className={inputStyles} />
                            <FieldError />
                        </TextField>
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
                        <div className="flex gap-2">
                            <Button type="submit" className={"bg-brand-secoundry text-white"}>
                                <Check />
                                Submit
                            </Button>
                            <Button type="reset" variant="secondary">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );

};

export default SignUp;
