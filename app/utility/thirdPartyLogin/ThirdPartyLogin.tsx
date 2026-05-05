"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SocialLogin({ google, github }: { google: string, github: string }) {
    const handleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        })
        if (data.error) {
            console.log(data.error)
        }
    }

    const handleGithubLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        })
        if (data.error) {
            console.log(data.error)
        }
    }

    return (
        <div className="flex w-full flex-col gap-3">
            <Button className="w-full" variant="tertiary" onClick={handleLogin}>
                <Icon icon="devicon:google" />
                {google}
            </Button>
            <Button className="w-full" variant="tertiary" onClick={handleGithubLogin}>
                <Icon icon="mdi:github" />
                {github}
            </Button>
        </div>
    );
}
