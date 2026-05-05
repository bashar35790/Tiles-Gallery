"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SocialSignUp({ google, github }: { google: string, github: string }) {

    const handleSignUpGoogle = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (data?.error) {
            console.error("Google Sign Up Error:", data.error);
        }
    }

    const handleSignUpGithub = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
        if (data?.error) {
            console.error("Github Sign Up Error:", data.error);
        }
    }
    
    return (
        <div className="flex w-full flex-col gap-3">
            <Button className="w-full" variant="tertiary" onClick={handleSignUpGoogle}>
                <Icon icon="devicon:google" />
                {google}
            </Button>
            <Button className="w-full" variant="tertiary" onClick={handleSignUpGithub}>
                <Icon icon="mdi:github" />
                {github}
            </Button>
        </div>
    );
}
