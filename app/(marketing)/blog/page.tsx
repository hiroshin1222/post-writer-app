import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default function BlogPage() {
    const posts = allPosts.sort((a, b) => b.date.localeCompare(a.date));
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <Link href={`/${post.slug}`} key={post._id} className="block group">
                        <article className="bg-white shadow-md rounded-lg p-6 h-full transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer">
                            {post.image && (
                                <Image 
                                    src={post.image} 
                                    alt={post.title} 
                                    width={500} 
                                    height={300} 
                                    className="rounded-lg mb-4 w-full" 
                                />
                            )}
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                            {post.description && (
                                <p className="text-gray-600 mb-4">{post.description}</p>
                            )}
                            {post.date && (
                                <p className="text-gray-500 text-sm">{format(post.date, 'yyyy-MM-dd')}</p>
                            )}
                            <span className="text-blue-500 inline-block">Read More →</span>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}