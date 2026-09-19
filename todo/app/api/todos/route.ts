import type { NextRequest } from "next/server";
import { clearCompleted, createTodo, listTodos } from "@/lib/redis";
import { createTodoSchema } from "@/lib/types";
import { json, readJson, requireApiSession, requireSameOrigin } from "@/lib/http";

export async function GET(request: NextRequest) {
  const authError = await requireApiSession(request); if (authError) return authError;
  return json({ todos: await listTodos() });
}
export async function POST(request: NextRequest) {
  const authError = await requireApiSession(request); if (authError) return authError;
  const originError = requireSameOrigin(request); if (originError) return originError;
  try {
    const parsed = createTodoSchema.safeParse(await readJson(request));
    if (!parsed.success) return json({ error: "Invalid task" }, 400);
    return json({ todo: await createTodo(parsed.data.text) }, 201);
  } catch { return json({ error: "Invalid request" }, 400); }
}
export async function DELETE(request: NextRequest) {
  const authError = await requireApiSession(request); if (authError) return authError;
  const originError = requireSameOrigin(request); if (originError) return originError;
  if (request.nextUrl.searchParams.get("completed") !== "true") return json({ error: "Invalid request" }, 400);
  return json({ removed: await clearCompleted() });
}
