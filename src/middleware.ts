import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Prevent user to do or restricted some tasks.
 *
 * @learn - https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
 * @param {NextRequest} request
 * @returns {*}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
  // redirect with other urls
  return NextResponse.next();
}

// this matcher will help us to trigger middle for every route
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
