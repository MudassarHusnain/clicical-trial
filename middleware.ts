import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId } = auth();

  // Verify if the user is an admin
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  // Redirect non-admins if they try to access admin routes
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    auth().protect(); // This ensures Clerk handles session verification and redirects if needed
  }

  // Proceed with the request if route checks pass
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // Match all routes except static files and Next.js internals
};
