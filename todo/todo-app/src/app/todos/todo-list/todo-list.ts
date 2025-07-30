import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo.model';
import { TodosService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
 todos: Todo[] = [];

  constructor(private todoService: TodosService) {
  }

  ngOnInit(): void {
    const initialTodos: Todo[] = [
      { id: 1, description: 'Workout', done: false, targetDate: new Date() },
      { id: 2, description: 'Angular Course', done: false, targetDate: new Date() },
      { id: 3, description: 'Cook Lunch', done: false, targetDate: new Date() }
    ];
    this.todoService.initializeTodos(initialTodos);
    this.todos = this.todoService.getTodos();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos(); // refresh
  }

  // todos = [
  //   { id: 1, description: 'Workout' },
  //   { id: 2, description: 'Angular Course' },
  //   { id: 3, description: 'Cook Lunch' }
  // ]
  // todo = {
  //   id: 1,
  //   description: 'Workout'
  // }

}
