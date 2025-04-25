import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function IndexPage() {
  return (
    <>
      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 max-w-[64rem]">
          <Link href={siteConfig.links.x} target="_blank" rel="noreferrer" className="bg-muted px-4 py-1.5 rounded-2xl font-medium text-sm">
            Xをフォローする
          </Link>
          <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl">Post writer</h1>
          <p className="mt-6 text-muted-foreground sm:text-xl md:text-2xl">Post writerは、Xのフォロワーの投稿をもとに、
            自動で投稿を生成するサービスです。</p>
            <div className="flex gap-2 mt-8">
                <Link href={"/login"} className={cn(buttonVariants({variant: "default"}), "mt-4")}>はじめる</Link>
                <Link href={siteConfig.links.github} className={cn(buttonVariants({variant: "outline"}), "mt-4")} target="_blank" rel="noreferrer">GitHub</Link>
            </div>
        </div>
      </section>
    </>
  );
}
