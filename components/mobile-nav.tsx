"use client"

import { siteConfig } from "@/config/site";
import { NavItem } from "@/types/site";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
    items: NavItem[];
    setShowMobileMenu: (showMobileMenu: boolean) => void;
}

export default function MobileNav({items, setShowMobileMenu}: MobileNavProps) {
    return (
        <div className="fixed inset-0 z-50 flex h-screen flex-col bg-background md:hidden">
            <div className="flex items-center justify-between p-4 border-b">
                <Link href={"/"} className="flex items-center gap-2">
                    <span className="text-primary font-bold">{siteConfig.name}</span>
                </Link>
                <button onClick={() => setShowMobileMenu(false)} className="p-2">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-col py-4">
                {items.map((item, index) => (
                    <Link 
                        href={item.href} 
                        key={index} 
                        className="block px-4 py-3 text-lg hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setShowMobileMenu(false)}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )
}