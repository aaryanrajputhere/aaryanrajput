import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "todo_session";
export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;

function jwtKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error("JWT_SECRET must be at least 32 characters");
  return new TextEncoder().encode(secret);
}
export function hashAccessKey(value: string) { return createHash("sha256").update(value, "utf8").digest("hex"); }
export function accessKeyMatches(value: string) {
  const expected = process.env.ACCESS_KEY_HASH;
  if (!expected || !/^[a-f0-9]{64}$/i.test(expected)) throw new Error("ACCESS_KEY_HASH is not configured");
  return timingSafeEqual(Buffer.from(hashAccessKey(value), "hex"), Buffer.from(expected, "hex"));
}
export async function createSessionToken() {
  return new SignJWT({ access: "todo" }).setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject("owner").setIssuedAt().setExpirationTime(`${SESSION_TTL_SECONDS}s`).sign(jwtKey());
}
export async function verifySessionToken(token?: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, jwtKey(), { algorithms: ["HS256"], subject: "owner" });
    return payload.access === "todo";
  } catch { return false; }
}
