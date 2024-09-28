import { NextResponse } from "next/server";
import { Middleware, MiddlewareNext, MiddlewarePayload } from ".";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/env";

export const strictlyAuthorized: Middleware =
  (route?: RegExp, next?: MiddlewareNext | undefined) =>
  (payload: MiddlewarePayload) => {
    if (
      !route ||
      (payload.request.nextUrl.pathname.match(route) && !payload.data?.user)
    )
      return NextResponse.redirect(new URL("/auth/login", payload.request.url));

    if (!!next) return next(payload);
  };

export const strictlyUnauthorized: Middleware =
  (route?: RegExp, next?: MiddlewareNext | undefined) =>
  (payload: MiddlewarePayload) => {
    /**
     * Only run if...
     * - pathname matches the route
     * - route does not exists
     * - user already authenticated
     */
    if (
      !route ||
      (payload.request.nextUrl.pathname.match(route) && !!payload.data?.user)
    )
      return NextResponse.redirect(new URL("/", payload.request.url));

    if (!!next) return next(payload);
  };

/**
 * We only want to read and decode our token once.
 * We want to pass that on to the other middleware to access data.
 * This will be used for access control, authentication and general identification.
 */
export const decodeToken: Middleware =
  (route?: RegExp, next?: MiddlewareNext | undefined) =>
  (payload: MiddlewarePayload) => {
    const { request } = payload;
    const token = request.cookies.get("token")?.value;
    if (token)
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (payload as any).user = decoded;
      } catch (error) {}

    if (next) return next(payload);
    return null;
  };
