import { beforeAll, describe, expect, it } from "vitest";
import { decodeJwt } from "jose";
import { accessKeyMatches, createSessionToken, hashAccessKey, SESSION_TTL_SECONDS, verifySessionToken } from "./auth";

const key = "todo_test_access_key_that_is_long_enough";

beforeAll(() => {
  process.env.ACCESS_KEY_HASH = hashAccessKey(key);
  process.env.JWT_SECRET = "test-jwt-secret-that-is-at-least-thirty-two-characters";
});

describe("authentication", () => {
  it("matches only the configured access key", () => {
    expect(accessKeyMatches(key)).toBe(true);
    expect(accessKeyMatches(`${key}x`)).toBe(false);
  });

  it("accepts a valid signed session and rejects a tampered one", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
    expect(await verifySessionToken(`${token.slice(0, -1)}x`)).toBe(false);
    expect(await verifySessionToken()).toBe(false);
  });

  it("expires the signed session after 30 days", async () => {
    const payload = decodeJwt(await createSessionToken());
    expect(payload.exp! - payload.iat!).toBe(SESSION_TTL_SECONDS);
  });
});
