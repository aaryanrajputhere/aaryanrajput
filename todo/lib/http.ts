import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", Pragma: "no-cache" };
export function json(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: privateHeaders }); }
export async function requireApiSession(request: NextRequest) {
  return (await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) ? null : json({ error: "Unauthorized" }, 401);
}
export function requireSameOrigin(request: NextRequest) {
  return request.headers.get("origin") === new URL(request.url).origin ? null : json({ error: "Invalid request origin" }, 403);
}
export async function readJson(request: NextRequest, maxBytes = 4096) {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) throw new Error("PAYLOAD_TOO_LARGE");
  return request.json();
}
