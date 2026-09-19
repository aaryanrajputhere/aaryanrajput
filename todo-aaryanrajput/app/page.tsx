import { TodoApp } from "@/app/todo-app";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { listTodos } from "@/lib/redis";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value))) redirect("/login");
  return <TodoApp initialTodos={await listTodos()} />;
}
