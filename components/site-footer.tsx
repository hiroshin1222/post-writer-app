import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="container mx-auto px-4 py-16 max-w-[64rem]">
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">© 2025 Post writer</p>
                <div className="flex items-center gap-2">
                    <Link href="/privacy">プライバシーポリシー</Link>
                    <Link href="/terms">利用規約</Link>
                </div>
            </div>
        </footer>
    );
}