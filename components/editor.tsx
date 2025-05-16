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

interface EditorProps {
    post: Pick<Post, "id" | "title" | "content" | "published">;
}

export default function Editor({ post }: EditorProps) {
    const ref = useRef<EditorJS>();

    const [isMounted, setIsMounted] = useState(false);

    const initializeEditor = useCallback(async () => {
        const editor = new EditorJS({
            holder: "editor",
            onReady: () => { // onReadyはEditorJSライブラリが提供するコールバック関数で、EditorJSインスタンスが準備できた時に呼び出される
                ref.current = editor;
            },
            placeholder: 'コンテンツを入力してください',
            inlineToolbar: true,
            tools: {
                header: Header,
                linkTool: LinkTool,
                list: EditorjsList,
                code: Code,
            },
        });
    }, []);

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

    return (
        <form>
            <div className="flex items-center justify-between">
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                    戻る
                </Link>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">公開</p>

                    <button className={buttonVariants({ variant: "default" })} type="submit">
                        保存
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
                />
            </div>

            <div id="editor" className="prose prose-sm prose-slate dark:prose-invert"></div>

            <p>
               Use <kbd>Tab</kbd> to open the command menu.
            </p>

            
        </form>
    )
}