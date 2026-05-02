"use client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const inputStyles =
    "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

const Login = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };
    return (
        <>
            <div className="py-16 mx-auto">
                <div className="bg-brand-primari p-10 rounded-2xl max-w-2xl flex flex-col justify-center items-center gap-5">
                    <div className="text-left space-y-2.5">
                        <h2 className="text-5xl text-white text-left">Welcome back</h2>
                        <p>Sign in to access your tiles gallery.</p>
                    </div>
                    <Form className="flex  flex-col gap-6 justify-start" onSubmit={onSubmit}>
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
                            <Input placeholder="john@example.com" className={inputStyles} />
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
                            <Input placeholder="Enter your password" className={inputStyles} />
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

export default Login;