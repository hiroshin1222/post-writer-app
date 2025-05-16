import Editor from "@/components/editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Post, User } from "@prisma/client";

interface EditorProps {
    params: {
        postId: string;
    }
}

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
    const post = await db.post.findFirst({
        where: {
            id: postId,
            authorId: userId,
        }
    })

    return post;
}


export default async function EditorPage({ params }: EditorProps) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }
    const userId = user?.id;

    const postId = params.postId;
    const post = await getPostForUser(params.postId, userId);

    return (
       <Editor 
        post={{
            id: post?.id,
            title: post?.title,
            content: post?.content,
            published: post?.published,
        }}
       />
    )
}