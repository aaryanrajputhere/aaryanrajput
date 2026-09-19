import { describe, expect, it } from "vitest";
import { createTodoSchema, importTodosSchema, todoSchema, updateTodoSchema } from "./types";

describe("todo validation", () => {
  it("trims valid tasks and rejects blank or oversized text", () => {
    expect(createTodoSchema.parse({ text: "  ship it  " }).text).toBe("ship it");
    expect(createTodoSchema.safeParse({ text: "   " }).success).toBe(false);
    expect(createTodoSchema.safeParse({ text: "x".repeat(141) }).success).toBe(false);
  });

  it("requires at least one supported update", () => {
    expect(updateTodoSchema.safeParse({ completed: true }).success).toBe(true);
    expect(updateTodoSchema.safeParse({ urgent: true }).success).toBe(true);
    expect(updateTodoSchema.safeParse({}).success).toBe(false);
    expect(updateTodoSchema.safeParse({ admin: true }).success).toBe(false);
  });

  it("accepts a bounded import with valid records", () => {
    const legacy = { id: crypto.randomUUID(), text: "saved", completed: false, createdAt: new Date().toISOString() };
    expect(importTodosSchema.parse({ todos: [legacy] }).todos[0].urgent).toBe(false);
    expect(todoSchema.parse({ ...legacy, urgent: true }).urgent).toBe(true);
  });
});
