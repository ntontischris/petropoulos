import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /images, /favicon.ico (static files)
    "/((?!api|_next|images|favicon\\.ico|.*\\..*).*)",
  ],
};
