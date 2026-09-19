import type { Todo } from "./types";

export function orderTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    const rank = (todo: Todo) => todo.completed ? 2 : todo.urgent ? 0 : 1;
    return rank(a) - rank(b);
  });
}
