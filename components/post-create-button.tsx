'use client';

import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostCreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
}

export default function PostCreateButton({ className, variant,  ...props }: PostCreateButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: "新しい投稿" }),
        });

        if (!res.ok) {
            toast.error("投稿に失敗しました", {
                description: "もう一度試してください",
                position: "top-center",
                duration: 5000,
                style: {
                    background: "hsl(var(--destructive))",
                    color: "white",
                }
            });
            setIsLoading(false);
            return;
        }

        const post = await res.json();
        toast.success("投稿を作成しました", {
            position: "top-right",
            duration: 3000,
        });
        router.refresh();
        router.push(`/editor/${post.id}`);
        setIsLoading(false);
    };

    return (
        <button 
            className={cn(buttonVariants({ variant }), className)} 
            onClick={onClick} 
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icon.add className="mr-2 h-4 w-4" />
            )}
            新しい投稿
        </button>
    )
}