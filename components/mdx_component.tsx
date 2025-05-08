"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "@/components/callout";

const components = {
    Image,
    Callout,
}

export default function Mdx({ code }: { code: string }) {
    const Component = useMDXComponent(code);
    return (
        <div className="prose lg:prose-lg max-w-none">
            <Component components={components} />
        </div>
    );
}

