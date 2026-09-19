import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid(), text: z.string().trim().min(1).max(140), completed: z.boolean(), createdAt: z.string().datetime()
});
export const createTodoSchema = z.object({ text: z.string().trim().min(1).max(140) }).strict();
export const updateTodoSchema = z.object({
  completed: z.boolean().optional(), text: z.string().trim().min(1).max(140).optional()
}).strict().refine((value) => Object.keys(value).length > 0);
export const importTodosSchema = z.object({ todos: z.array(todoSchema).max(500) }).strict();
export type Todo = z.infer<typeof todoSchema>;
