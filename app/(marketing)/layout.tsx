import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MainNav from "@/components/main_nav";
import { marketingConfig } from "@/config/marketing";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <header className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <MainNav items={marketingConfig.mainNav} />
                    <nav>
                        <Link href={"/login"} className={cn(buttonVariants({variant: "outline"}), "text-sm font-medium")}>ログイン</Link>
                    </nav>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}