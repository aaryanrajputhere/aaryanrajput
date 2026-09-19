import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { accessKeyMatches, createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { json, readJson, requireSameOrigin } from "@/lib/http";

const schema = z.object({ key: z.string().min(32).max(128) }).strict();
export async function POST(request: NextRequest) {
  const originError = requireSameOrigin(request); if (originError) return originError;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limiter = new Ratelimit({ redis: getRedis(), limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "todo:login" });
  if (!(await limiter.limit(ip)).success) return json({ error: "Unable to authenticate" }, 429);
  try {
    const parsed = schema.safeParse(await readJson(request, 1024));
    if (!parsed.success || !accessKeyMatches(parsed.data.key)) return json({ error: "Unable to authenticate" }, 401);
    const response = json({ ok: true });
    response.cookies.set(SESSION_COOKIE, await createSessionToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/" });
    return response;
  } catch { return json({ error: "Unable to authenticate" }, 401); }
}
