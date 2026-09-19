import { beforeAll, describe, expect, it } from "vitest";
import { accessKeyMatches, createSessionToken, hashAccessKey, verifySessionToken } from "./auth";

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
});
