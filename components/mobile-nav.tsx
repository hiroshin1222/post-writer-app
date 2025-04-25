"use client"

import { siteConfig } from "@/config/site";
import { NavItem } from "@/types/site";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MobileNavProps {
    items: NavItem[];
    setShowMobileMenu: (showMobileMenu: boolean) => void;
}

export default function MobileNav({items, setShowMobileMenu}: MobileNavProps) {
    const [isClosing, setIsClosing] = useState(false);
    
    const handleClose = () => {
        setIsClosing(true);
        // アニメーション完了後にメニューを実際に閉じる
        setTimeout(() => {
            setShowMobileMenu(false);
        }, 300); // アニメーションの長さと合わせる
    };
    
    return (
        <div className={`fixed inset-0 z-50 flex h-screen flex-col bg-background md:hidden 
                        duration-300 ease-in-out transition-all
                        ${isClosing ? 'animate-out slide-out-to-left' : 'animate-in slide-in-from-left'}`}>
            <div className="flex items-center justify-between p-4 border-b">
                <Link href={"/"} className="flex items-center gap-2">
                    <span className="text-primary font-bold">{siteConfig.name}</span>
                </Link>
                <button onClick={handleClose} className="p-2">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-col py-4">
                {items.map((item, index) => (
                    <Link 
                        href={item.href} 
                        key={index} 
                        className="block px-4 py-3 text-lg hover:bg-accent transition duration-150"
                        onClick={handleClose}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )
}