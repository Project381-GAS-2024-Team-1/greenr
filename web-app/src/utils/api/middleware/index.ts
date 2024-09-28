import { NextRequest, NextResponse } from "next/server";

export type Middleware = (
  route?: RegExp,
  next?: MiddlewareNext | undefined
) => MiddlewareNext;

// If you dont specify route it will run for all routes.
// If you dont specify data it will be initiated as an empty object.
export type MiddlewarePayload = {
  request: NextRequest;
  data?: any;
};

export type MiddlewareNext = (
  payload: MiddlewarePayload
) => Promise<NextResponse<unknown> | null | undefined>;
