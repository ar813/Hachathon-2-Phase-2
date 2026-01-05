import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = ['/login', '/signup', '/api/auth'];

    // Allow access to public paths and auth API routes
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Check for better-auth session cookie
    const sessionToken = req.cookies.get('better-auth.session_token')?.value;

    if (!sessionToken) {
        // If it's an API route, return 401 JSON
        if (pathname.startsWith('/api/')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        // Redirect to login for protected pages
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Session exists, allow request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
