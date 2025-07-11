"use client";

import { Post } from "@/generated/prisma";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Icon } from "./icon";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function deletePost(postId: string) {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        return true;
    } catch (err) {
        toast.error("削除に失敗しました", {
            description: "もう一度お試しください"
        });
    }
}

interface PostOperationsProps {
    post: Pick<Post, "id" | "title">;
}

export default function PostOperations({ post }: PostOperationsProps) {
    const router = useRouter(); // 記事削除後のページリフレッシュ用
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icon.ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        {/* <Icon.pencil className="h-4 w-4" /> */}
                        <Link href={`/editor/${post.id}`} className="w-full">編集</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-destructive" onClick={() => setShowDeleteAlert(true)}>
                        {/* <Icon.trash className="h-4 w-4" /> */}
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>本当にこの記事を削除しますか?</AlertDialogTitle>
                <AlertDialogDescription>
                    この操作は元に戻すことはできません。
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={async (e) => {
                    e.preventDefault();
                    setIsDeleting(true);
                    const deleted = await deletePost(post.id);
                    if (deleted) {
                        setShowDeleteAlert(false);
                        router.refresh();
                    }
                    setIsDeleting(false);
                }}
                className="bg-red-500 hover:bg-red-600"
                >
                    {isDeleting ? <Icon.spinner className="h-4 w-4 animate-spin" /> : <Icon.trash className="h-4 w-4" />}
                    削除
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}