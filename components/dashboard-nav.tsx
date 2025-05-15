'use client'

import { SidebarNavItem } from "@/types/site";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface DashboardNavProps {
    items: SidebarNavItem[];
}

export default function DashboardNav({ items }: DashboardNavProps) {
    const pathname = usePathname();

    if (!items.length) return null;

    return (
        <nav className="flex flex-col gap-2">
            {items.map((item) => {
                const IconComponent = Icon[item.icon || "arrowRight"];
                return (
                    <DashboardNavItem 
                        key={item.title} 
                        item={item} 
                        IconComponent={IconComponent} 
                        pathname={pathname}
                    />
                )
            })}
        </nav>
    )
}

function DashboardNavItem({ 
    item, 
    IconComponent,
    pathname
}: { 
    item: SidebarNavItem;
    IconComponent: React.ComponentType<any>;
    pathname: string;
}) {
    const isActive = pathname === item.href;
    
    return (
        <Link 
            href={item.href!} 
            className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-accent/50 hover:text-accent-foreground"
            )}
        >
            <IconComponent className={cn(
                "h-4 w-4 mr-2",
                isActive ? "text-accent-foreground" : "text-muted-foreground"
            )} />
            <span>{item.title}</span>
        </Link>
    )
}