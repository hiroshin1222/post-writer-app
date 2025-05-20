import { z } from "zod";

export const PostSchema = z.object({
    title: z.string().min(3, { message: "タイトルは3文字で入力してください" }).max(128, { message: "タイトルは128文字以内で入力してください" }),
    content: z.any().optional(), // jsonのバリデーション、スキーマは存在しないのでanyにする
});

export type postPatchSchemaType = z.infer<typeof PostSchema>;