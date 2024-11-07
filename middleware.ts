import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Call `auth` only once and destructure the result
  const { userId } = await auth();

  // Verify if the user is an admin
  const isAdminUser = userId === process.env.NEXT_PUBLIC_ADMIN_USER;
  console.log(isAdminUser)
  // Redirect non-admins if they try to access admin routes
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect all non-public routes if the user is not authenticated
  if (!isPublicRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url)); // Redirect to sign-in if not authenticated
    }
  }

  // Proceed with the request if route checks pass
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // Match all routes except static files and Next.js internals
};
