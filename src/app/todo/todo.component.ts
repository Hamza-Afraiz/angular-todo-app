import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: false,
})
export class TodoComponent {
  constructor(private fb: FormBuilder, private todoService: TodoService) {}
  todoForm: FormGroup = new FormGroup({
    task: new FormControl('', [Validators.required]),
  });

  getTodos() {
    return this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.todoForm.invalid) return;
    this.todoService.addTodo(this.todoForm.value.task);
    this.todoForm.reset();
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  toggleCompletion(id: number): void {
    this.todoService.toggleCompletion(id);
  }
}
