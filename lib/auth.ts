import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    adapter: PrismaAdapter(db), // これがあると、トークンではなくDBの方でセッションを管理するように自動で切り替わる。下部で設定しているようにsessionのstrategyをjwtにすると、sessionの管理をトークンに任せることができる
    pages: {
        signIn: "/login",
    },
    callbacks: {
       
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    }
};