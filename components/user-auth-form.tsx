'use client';

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GithubIcon, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function UserAuthForm() {
    const [isGithubLoading, setIsGithubLoading] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto grid gap-6"> {/* フォームの最大幅と中央寄せ */}
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="name@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="********" />
        </div>
        <Button type="submit" className="w-full">メールアドレスでログイン</Button>
      </form>

      {/* 区切り線 */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">または</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Githubログインボタン */}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2" 
        onClick={async () => {
            setIsGithubLoading(true);
            try {
                await signIn("github", { callbackUrl: "/dashboard" });
            } catch (error) {
                console.error("GitHub login error:", error);
            } finally {
                setIsGithubLoading(false);
            }
        }}
      >
        {isGithubLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GithubIcon className="w-4 h-4" />}
        Githubでログイン
      </Button>
    </div>
  );
}