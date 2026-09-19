import type { NextRequest } from "next/server";
import { importTodos } from "@/lib/redis";
import { importTodosSchema } from "@/lib/types";
import { json, readJson, requireApiSession, requireSameOrigin } from "@/lib/http";

export async function POST(request: NextRequest) {
  const authError = await requireApiSession(request); if (authError) return authError;
  const originError = requireSameOrigin(request); if (originError) return originError;
  try {
    const parsed = importTodosSchema.safeParse(await readJson(request, 100_000));
    if (!parsed.success) return json({ error: "Invalid tasks" }, 400);
    return json({ todos: await importTodos(parsed.data.todos) });
  } catch { return json({ error: "Invalid request" }, 400); }
}
