import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MainNav from "@/components/main_nav";
import SiteFooter from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";
import DashboardNav from "@/components/dashboard-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            <header className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <MainNav items={dashboardConfig.mainNav} />
                </div>
            </header>
            <div className="flex flex-1">
                {/* サイドバー */}
                <aside className="hidden md:block w-64 border-r p-4">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                {/* メインコンテンツ */}
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
            <SiteFooter />
        </div>
    )
}