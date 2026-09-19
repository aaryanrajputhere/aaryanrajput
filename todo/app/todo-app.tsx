"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Todo } from "@/lib/types";
import { orderTodos } from "@/lib/todo-order";

const LEGACY_STORAGE_KEY = "aaryan-todos-v1";
type Filter = "all" | "active" | "completed";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  if (response.status === 401) window.location.assign("/login");
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

export function TodoApp({ initialTodos }: { initialTodos: Todo[] }) {
  const router = useRouter(); const [todos, setTodos] = useState(initialTodos); const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY); if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Array<{ id?: string; text?: string; completed?: boolean; createdAt?: string }>;
      const legacy = parsed.filter((item) => typeof item.text === "string" && item.text.trim()).slice(0, 500).map((item, index) => ({
        id: item.id && /^[0-9a-f-]{36}$/i.test(item.id) ? item.id : crypto.randomUUID(), text: item.text!.trim().slice(0, 140),
        completed: Boolean(item.completed), createdAt: item.createdAt && !Number.isNaN(Date.parse(item.createdAt)) ? item.createdAt : new Date(Date.now() - index).toISOString()
      }));
      if (!legacy.length) { localStorage.removeItem(LEGACY_STORAGE_KEY); return; }
      api<{ todos: Todo[] }>("/api/todos/import", { method: "POST", body: JSON.stringify({ todos: legacy }) })
        .then(({ todos: imported }) => { setTodos(imported); localStorage.removeItem(LEGACY_STORAGE_KEY); })
        .catch(() => setError("could not import your local tasks. they are still safe on this device."));
    } catch { setError("could not read the tasks saved on this device."); }
  }, []);

  const visible = useMemo(() => orderTodos(todos.filter((todo) => filter === "all" || (filter === "active" ? !todo.completed : todo.completed))), [todos, filter]);
  const remaining = todos.filter((todo) => !todo.completed).length;
  const today = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  async function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const text = String(new FormData(form).get("text") ?? "").trim(); if (!text || busy) return;
    setBusy(true); setError("");
    try { const { todo } = await api<{ todo: Todo }>("/api/todos", { method: "POST", body: JSON.stringify({ text }) }); setTodos((current) => [todo, ...current]); form.reset(); }
    catch { setError("could not add that task. please try again."); } finally { setBusy(false); }
  }
  async function toggle(todo: Todo) {
    setError("");
    try { const { todo: updated } = await api<{ todo: Todo }>(`/api/todos/${todo.id}`, { method: "PATCH", body: JSON.stringify({ completed: !todo.completed }) }); setTodos((current) => current.map((item) => item.id === updated.id ? updated : item)); }
    catch { setError("could not update that task."); }
  }
  async function toggleUrgent(todo: Todo) {
    setError("");
    try { const { todo: updated } = await api<{ todo: Todo }>(`/api/todos/${todo.id}`, { method: "PATCH", body: JSON.stringify({ urgent: !todo.urgent }) }); setTodos((current) => current.map((item) => item.id === updated.id ? updated : item)); }
    catch { setError("could not update that task."); }
  }
  async function remove(todo: Todo) {
    setError("");
    try { await api(`/api/todos/${todo.id}`, { method: "DELETE" }); setTodos((current) => current.filter((item) => item.id !== todo.id)); }
    catch { setError("could not delete that task."); }
  }
  async function clearCompleted() {
    setError("");
    try { await api("/api/todos?completed=true", { method: "DELETE" }); setTodos((current) => current.filter((todo) => !todo.completed)); }
    catch { setError("could not clear completed tasks."); }
  }
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/login"); router.refresh(); }

  return (
    <main className="shell">
      <header className="site-header"><a className="brand" href="https://aaryanrajput.com">aaryanrajput.com</a><button className="link-button" onClick={logout}>log out</button></header>
      <section className="intro"><h1>todo</h1><p>a small place to keep track of what needs doing.</p><p className="date">{today}</p></section>
      <section className="composer" aria-label="Add a task"><form onSubmit={addTodo}><label className="sr-only" htmlFor="todo-input">New task</label><input id="todo-input" name="text" placeholder="what needs doing?" maxLength={140} autoComplete="off" required /><button type="submit" disabled={busy}>{busy ? "adding…" : "add task"}</button></form></section>
      <section className="tasks" aria-live="polite">
        <div className="toolbar"><p><strong>{remaining}</strong> remaining</p><div className="filters" role="group" aria-label="Filter tasks">{(["all", "active", "completed"] as Filter[]).map((value) => <button key={value} className={`filter${filter === value ? " active" : ""}`} onClick={() => setFilter(value)}>{value === "completed" ? "done" : value}</button>)}</div></div>
        <ul>{visible.map((todo) => <li key={todo.id} className={`todo-item${todo.completed ? " completed" : ""}${todo.urgent ? " urgent" : ""}`}><button className="check" onClick={() => toggle(todo)} aria-label={todo.completed ? `Mark ${todo.text} as active` : `Mark ${todo.text} as completed`}>✓</button><span className="todo-text">{todo.text}</span><button className="urgent-toggle" onClick={() => toggleUrgent(todo)} aria-pressed={todo.urgent} aria-label={`${todo.urgent ? "Remove urgent from" : "Mark urgent"} ${todo.text}`}>urgent</button><button className="delete" onClick={() => remove(todo)} aria-label={`Delete ${todo.text}`}>×</button></li>)}</ul>
        {!visible.length && <div className="empty"><p>nothing here yet.</p><small>add a task above and make a little progress.</small></div>}
      </section>
      <p className="form-error app-error" role="alert">{error}</p>
      <footer><p>synced across your devices</p>{todos.some((todo) => todo.completed) && <button onClick={clearCompleted}>clear completed</button>}</footer>
    </main>
  );
}
