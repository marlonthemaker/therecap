export interface SubTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  subTodos: SubTodo[];
}

export interface TodoList {
id: string;
todos: Todo[];
userId: string;
}