import DashboardHeader from "@/components/dashboard-header";
import DashBoardShell from "@/components/dashboard-shell";
import PostCreateButton from "@/components/post-create-button";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import PostItem from "@/components/post-item";

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login");
    }

    const posts = await db.post.findMany({
        where: {
            authorId: user.id,
        },
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <DashBoardShell>
            <DashboardHeader heading="記事投稿" text="記事の投稿と管理">
                <PostCreateButton />
            </DashboardHeader>
            <div className="grid gap-4">
                {posts.length? (
                    posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">投稿がありません</p>
                    </div>
                )}
                
            </div>
        </DashBoardShell>
    )
}