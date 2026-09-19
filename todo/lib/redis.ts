import { Redis } from "@upstash/redis";
import type { Todo } from "@/lib/types";

const ITEMS_KEY = "todo:v1:items";
const ORDER_KEY = "todo:v1:order";
let redisClient: Redis | null = null;
export function getRedis() { if (!redisClient) redisClient = Redis.fromEnv(); return redisClient; }

export async function listTodos(): Promise<Todo[]> {
  const redis = getRedis();
  const ids = await redis.zrange<string[]>(ORDER_KEY, 0, -1, { rev: true });
  if (!ids.length) return [];
  const todos = await Promise.all(ids.map((id) => redis.hget<Todo>(ITEMS_KEY, id)));
  return todos.filter((todo): todo is Todo => Boolean(todo));
}
export async function createTodo(text: string): Promise<Todo> {
  const todo: Todo = { id: crypto.randomUUID(), text, completed: false, createdAt: new Date().toISOString() };
  const redis = getRedis();
  await Promise.all([redis.hset(ITEMS_KEY, { [todo.id]: todo }), redis.zadd(ORDER_KEY, { score: Date.now(), member: todo.id })]);
  return todo;
}
export async function updateTodo(id: string, changes: Partial<Pick<Todo, "text" | "completed">>) {
  const redis = getRedis(); const current = await redis.hget<Todo>(ITEMS_KEY, id); if (!current) return null;
  const updated = { ...current, ...changes }; await redis.hset(ITEMS_KEY, { [id]: updated }); return updated;
}
export async function deleteTodo(id: string) {
  const redis = getRedis(); const [removed] = await Promise.all([redis.hdel(ITEMS_KEY, id), redis.zrem(ORDER_KEY, id)]); return removed > 0;
}
export async function clearCompleted() {
  const redis = getRedis(); const completed = (await listTodos()).filter((todo) => todo.completed); if (!completed.length) return 0;
  const pipeline = redis.pipeline(); completed.forEach((todo) => { pipeline.hdel(ITEMS_KEY, todo.id); pipeline.zrem(ORDER_KEY, todo.id); });
  await pipeline.exec(); return completed.length;
}
export async function importTodos(todos: Todo[]) {
  const redis = getRedis(); const pipeline = redis.pipeline(); let queued = 0;
  for (const todo of todos) {
    if (await redis.hexists(ITEMS_KEY, todo.id)) continue;
    pipeline.hset(ITEMS_KEY, { [todo.id]: todo });
    pipeline.zadd(ORDER_KEY, { score: new Date(todo.createdAt).getTime(), member: todo.id });
    queued += 2;
  }
  if (queued) await pipeline.exec();
  return listTodos();
}
