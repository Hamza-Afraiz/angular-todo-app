import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: false,
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos$!: any;

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      task: ['', Validators.required]
    });

    this.todos$ = this.todoService.todos$; // ✅ Moved here
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
