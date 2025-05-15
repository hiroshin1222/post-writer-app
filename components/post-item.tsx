import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import PostOperations from "./post-operations";
interface PostItemProps {
    post: Pick<Post, "id" | "title" | "published" | "createdAt">
}

export default function PostItem({ post }: PostItemProps) {
    return (
        <article className="flex items-center justify-between p-6 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-6">
                <Link 
                    href={`/editor/${post.id}`}
                    className={cn(
                        "group flex items-center gap-2",
                        buttonVariants({ variant: "ghost" }),
                        "hover:bg-transparent"
                    )}
                >
                    <h2 className="text-base font-medium leading-none group-hover:text-accent-foreground">
                        {post.title}
                    </h2>
                </Link>
                <div className="flex items-center gap-4">
                    <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        post.published 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                    )}>
                        {post.published ? "公開" : "下書き"}
                    </span>
                    <time className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>
            </div>

            <PostOperations post={post} />
        </article>
    )
}