import {withAuth } from "next-auth/middleware";
import { Roles } from "@/enums/Roles";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token,req }) => {
        const {url} = req;
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        if ( url.startsWith( baseUrl + "/admin") ){
            return token?.role == Roles.ADMIN ;
        } else if ( url.startsWith( baseUrl + "/customer") ){
            return token?.role == Roles.CUSTOMER ;
        }

        return false
      },
    },
  },
)

export const config = { matcher: ['/admin/:path*','/customer/:path*'] }