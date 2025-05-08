import { notFound } from "next/navigation";
import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import Mdx from "@/components/mdx_component";
import { Metadata } from "next";    
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = allPosts.find((post) => {
        const postSlugWithoutPrefix = post.slug.replace('blog/', '');
        return postSlugWithoutPrefix === params.slug;
    });
    if (!post) {
        notFound();
    }
    const metadata: Metadata = {    
        title: post.title,
        description: post.description,
        openGraph: {
            type: "article",
            locale: "ja",
            url: `${siteConfig.url}/blog/${post.slug.replace('blog/', '')}`,
            title: post.title,
            description: post.description,
            images: post.image ? [post.image] : undefined,
            siteName: siteConfig.name,
            publishedTime: post.date,
            modifiedTime: post.date,
            tags: post.tags,
            section: post.category,
            authors: post.authors,
        },
    }

    return metadata;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {

    console.log("Requested slug:", params.slug);
    
    // すべてのpostのslugを表示して確認
    console.log("Available slugs:", allPosts.map(post => post.slug));
    
    const post = allPosts.find((post) => {
        // blog/プレフィックスを除去して比較
        const postSlugWithoutPrefix = post.slug.replace('blog/', '');
        return postSlugWithoutPrefix === params.slug;
    });
    if (!post) {
        notFound();
    }
    return (
        <article className="container mx-auto px-4 py-16">
            <div className="text-sm text-gray-500 mb-4">{post.date && new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            {post.image && <Image src={post.image} alt={post.title} width={1000} height={1000} />}
            <Mdx code={post.body.code} />
            <hr className="my-8 border-t border-gray-300" />
            <Link href={`/blog`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Back to All Blog Posts</button>
            </Link>
        </article>
    );
}