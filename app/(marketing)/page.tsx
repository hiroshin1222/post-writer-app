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
            <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl">{siteConfig.name}</h1>
            <p className="mt-6 text-muted-foreground sm:text-xl md:text-2xl">{siteConfig.description}</p>
              <div className="flex gap-2 mt-8">
                  <Link href={"/login"} className={cn(buttonVariants({variant: "default"}), "mt-4")}>はじめる</Link>
                  <Link href={siteConfig.links.github} className={cn(buttonVariants({variant: "outline"}), "mt-4")} target="_blank" rel="noreferrer">GitHub</Link>
              </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-16 max-w-[64rem]">
          <h2 className="text-2xl font-bold">サービスの特徴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium">自動生成</h3>
              <p className="text-muted-foreground">Post writerは、Xのフォロワーの投稿をもとに、自動で投稿を生成します。</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="container mx-auto px-4 py-16 max-w-[64rem]">
          <h2 className="text-2xl font-bold">料金</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium">無料</h3>
            </div>
          </div>
        </section>
      </>
  );
}

// function FeatureCard({title, description}: {title: string, description: string}) {
//   return (
//     <div className="bg-muted p-6 rounded-lg">
//       <h3 className="text-lg font-medium">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </div>
//   );
// }
