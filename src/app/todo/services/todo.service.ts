import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private todos: Todo[] = [];

  constructor() { }

  // Fetch all to-dos
  getTodos(): Todo[] {
    return this.todos;
  }

  // Add a new to-do
  addTodo(task: string): void {
    const newTodo: Todo = { id: Date.now(), task, completed: false };
    this.todos.push(newTodo);
    this.todosSubject.next(this.todos);
  }

  // Delete a to-do by ID
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos);
  }

  // Toggle completion status of a to-do
  toggleCompletion(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosSubject.next(this.todos);
    }
  }
}
