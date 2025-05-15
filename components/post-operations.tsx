
import { Post } from "@/generated/prisma";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Icon } from "./icon";
import Link from "next/link";
interface PostOperationsProps {
    post: Pick<Post, "id" | "title">;
}

export default function PostOperations({ post }: PostOperationsProps) {
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
                    <DropdownMenuItem className="text-red-500 focus:text-destructive">
                        {/* <Icon.trash className="h-4 w-4" /> */}
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}