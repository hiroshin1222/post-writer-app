import { NextRequest } from "next/server";
import {NextResponse} from "next/server";
import {withAuth} from "next-auth/middleware";
import {getToken} from "next-auth/jwt";


export default withAuth(async function middleware(request: NextRequest) {
    const token = await getToken({req: request});
    const isAuth = !!token;
    const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return null;
    }
    if (!isAuth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
});

export const config = {
    matcher: ["/dashboard/:path*", "/editor/:path*"]
}