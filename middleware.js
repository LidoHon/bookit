import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";
export async function middleware(req) {
    const {isAuthenticated} = await checkAuth()
    // const {pathname} = req.nextUrl
    if(!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher: ["/bookings",'/room/add', '/room/my'],
}