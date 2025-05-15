// Udemyだとindex.d.tsだったけどchatGPTに聞いたら
// d拡張子はグローバル型を宣言する（declare global）
// もしくは型の補完を他のパッケージに提供する（ライブラリ開発）ためのものらしい
// なのでファイル名を変更し、config/site.tsのimport文も変更した（/siteを追加）

import { Icon } from "@/components/icon";

export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
};

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        x: string;
        github: string;
    };
};

export type MarketingConfig = {
    mainNav: NavItem[];
};

export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icon;
} & (
   | {
        href: string;
        items?: never;
    }
) & (
   | {
        href?: never;
        items: NavItem[];
    }
)
export type DashboardConfig = {
    mainNav: NavItem[];
    sidebarNav: SidebarNavItem[];
};