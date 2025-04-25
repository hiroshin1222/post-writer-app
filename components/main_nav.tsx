// hiddenは後にハンバーガーメニューを実装するために使用

'use client'

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { NavItem } from "@/types/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/mobile-nav";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
interface MainNavProps {
    items: NavItem[];
    children?: React.ReactNode;
}
export default function MainNav({ items }: MainNavProps) {
    const[showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    return (
        <div className="flex items-center gap-6">
            <Link href={"/"} className="text-2xl font-bold hidden md:block">
                <span className="text-primary">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                {items.map((item, index) => (
                <Link href={item.href} key={index} className={cn(buttonVariants({variant: "link"}), "text-sm font-medium")}>
                    {item.title}
                </Link>
            ))}
            </nav>
            <button className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <MenuIcon />
            </button>
            {showMobileMenu && <MobileNav items={items} setShowMobileMenu={setShowMobileMenu} />}
        </div>
    )
}