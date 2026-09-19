import { describe, expect, it } from "vitest";
import { orderTodos } from "./todo-order";
import type { Todo } from "./types";

const task = (text: string, completed: boolean, urgent: boolean): Todo => ({
  id: crypto.randomUUID(), text, completed, urgent, createdAt: new Date().toISOString()
});

describe("todo order", () => {
  it("puts urgent active tasks first, then other active tasks, then completed tasks", () => {
    const todos = [task("done urgent", true, true), task("active", false, false), task("urgent newer", false, true), task("done", true, false), task("urgent older", false, true)];
    expect(orderTodos(todos).map((todo) => todo.text)).toEqual(["urgent newer", "urgent older", "active", "done urgent", "done"]);
    expect(todos[0].text).toBe("done urgent");
  });

  it("moves a completed urgent task back to the top when unchecked", () => {
    const urgent = task("urgent", true, true);
    expect(orderTodos([task("active", false, false), urgent]).at(-1)).toBe(urgent);
    expect(orderTodos([task("active", false, false), { ...urgent, completed: false }])[0].text).toBe("urgent");
  });
});
