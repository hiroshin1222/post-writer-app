'use client';

import { buttonVariants } from "./ui/button";
import Link from "next/link";
import TextareaAutosize from 'react-textarea-autosize';
import EditorJS from '@editorjs/editorjs';
import { useCallback, useEffect, useRef, useState } from "react";
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import EditorjsList from '@editorjs/list';
import Code from '@editorjs/code';
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema, postPatchSchemaType } from "@/lib/validations/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
interface EditorProps {
    post: Pick<Post, "id" | "title" | "content" | "published">;
}

export default function Editor({ post }: EditorProps) {
    const ref = useRef<EditorJS>();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const initializeEditor = useCallback(async () => {

        const body = PostSchema.parse(post);

        const editor = new EditorJS({
            holder: "editor",
            onReady: () => { // onReadyはEditorJSライブラリが提供するコールバック関数で、EditorJSインスタンスが準備できた時に呼び出される
                ref.current = editor;
            },
            placeholder: 'コンテンツを入力してください',
            inlineToolbar: true,
            data: body.content,
            tools: {
                header: Header,
                linkTool: LinkTool,
                list: EditorjsList,
                code: Code,
            },
        });
    }, [post]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            initializeEditor();
        }

        return () => {
            ref.current?.destroy();
            ref.current = undefined;
        }
    }, [isMounted, initializeEditor]);

    const { register, handleSubmit, formState: { errors } } = useForm<postPatchSchemaType>({
        resolver: zodResolver(PostSchema)
    })

    const onSubmit = async (data: postPatchSchemaType) => {
        try {
            setIsSaving(true);
            const blocks = await ref.current?.save();

            const response = await fetch(`/api/posts/${post.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    content: blocks,
                }),  
            });

            setIsSaving(false);

            if (!response.ok) {
                toast.error("更新に失敗しました", {
                    description: "更新内容は保存されませんでした。もう一度試してください"
                });
                return;
            }

            router.refresh();
            toast.success("更新しました", {
                description: "更新内容は保存されました"
            });
        } catch (error) {
            console.error("Error:", error);
            toast.error("更新に失敗しました");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                    戻る
                </Link>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">公開</p>

                    <button className={buttonVariants({ variant: "default" })} type="submit">
                        {isSaving ? <Icon.spinner className="w-4 h-4 animate-spin" /> : "保存"}
                    </button>
                </div>
            </div>

            <div>
                <TextareaAutosize 
                    id="title" 
                    autoFocus 
                    defaultValue={post.title}
                    placeholder="タイトル" 
                    className="w-full resize-none outline-none overflow-hidden"
                    {...register("title")}
                />
            </div>

            <div id="editor" className="prose prose-sm prose-slate dark:prose-invert"></div>

            <p>
               Use <kbd>Tab</kbd> to open the command menu.
            </p>

            
        </form>
    )
}