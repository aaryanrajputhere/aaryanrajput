import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { json, requireSameOrigin } from "@/lib/http";

export async function POST(request: NextRequest) {
  const originError = requireSameOrigin(request); if (originError) return originError;
  const response = json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
