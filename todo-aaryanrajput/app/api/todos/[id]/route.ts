import type { NextRequest } from "next/server";
import { deleteTodo, updateTodo } from "@/lib/redis";
import { updateTodoSchema } from "@/lib/types";
import { json, readJson, requireApiSession, requireSameOrigin } from "@/lib/http";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: NextRequest, { params }: Context) {
  const authError = await requireApiSession(request); if (authError) return authError;
  const originError = requireSameOrigin(request); if (originError) return originError;
  const { id } = await params; if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "Invalid task" }, 400);
  try {
    const parsed = updateTodoSchema.safeParse(await readJson(request)); if (!parsed.success) return json({ error: "Invalid task" }, 400);
    const todo = await updateTodo(id, parsed.data); return todo ? json({ todo }) : json({ error: "Not found" }, 404);
  } catch { return json({ error: "Invalid request" }, 400); }
}
export async function DELETE(request: NextRequest, { params }: Context) {
  const authError = await requireApiSession(request); if (authError) return authError;
  const originError = requireSameOrigin(request); if (originError) return originError;
  const { id } = await params; if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "Invalid task" }, 400);
  return (await deleteTodo(id)) ? json({ ok: true }) : json({ error: "Not found" }, 404);
}
