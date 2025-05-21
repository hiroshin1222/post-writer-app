// avoid creating multiple instances of PrismaClient in development

// @schema.prisma 
// output   = "../generated/prisma" 
// you need to import prisma client from the designated output path in the @schema.prisma file

// 本番環境でログイン後のダッシュボードでエラーが出たので、以下にように修正（by calude）
// lib/db.ts
import { PrismaClient } from "../generated/prisma/index.js";

// Prismaのクライアントオプションを環境に基づいて設定
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],

    // サーバーレス環境向けの最適化
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
        directUrl: process.env.DIRECT_URL
      }
    }
  });
};

// グローバル型の定義
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Node.jsのグローバルオブジェクトに型付けされた変数を定義
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// グローバルに保存されたインスタンスを使うか、新しいインスタンスを作成
export const db = globalForPrisma.prisma ?? prismaClientSingleton();

// 開発環境ではグローバル変数に保存してホットリロード間でインスタンスを再利用
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// アプリケーション終了時にPrismaとの接続を適切に閉じる
// Next.jsでは通常必要ありませんが、長時間実行されるプロセスには有用です
/*
process.on('beforeExit', async () => {
  await db.$disconnect();
});
*/