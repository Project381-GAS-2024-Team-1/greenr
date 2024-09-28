import { NextRequest, NextResponse } from "next/server";
import {
  decodeToken,
  strictlyAuthorized,
  strictlyUnauthorized
} from "./utils/api/middleware/auth";

export default function middleware(request: NextRequest) {
  let response: Promise<NextResponse<unknown> | null | undefined> = decodeToken(
    /.*/,
    strictlyUnauthorized(
      /^\/auth\/.*/,
      strictlyAuthorized(
        /^(?!\/auth\/)(?!\/assets\/)(?!\/$)(?!\/_next\/static\/).*/
      )
    )
  )({ request });

  if (!!response) return response;
}
