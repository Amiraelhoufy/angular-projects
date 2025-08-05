import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo.model';
import { TodoData } from '../../service/data/todo-data';
import { HardcodedAuthentication } from '../../service/hardcoded-authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  errorMessage: string = '';
  successMessage: string = '';
  todos: Todo[] = [];

  constructor(
    private todoService: TodoData,
    private auth: HardcodedAuthentication,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const initialTodos: Todo[] = [
    //   { id: 1, description: 'Workout', done: false, targetDate: new Date() },
    //   { id: 2, description: 'Angular Course', done: false, targetDate: new Date() },
    //   { id: 3, description: 'Cook Lunch', done: false, targetDate: new Date() }
    // ];
    // this.todoService.initializeTodos(initialTodos);
    // this.todos = this.todoService.getTodos();

    this.refreshTodos();
  }

  refreshTodos() {
    const username = this.auth.getLoggedInUsername();

    if (username) {
      this.todoService.retrieveAllTodos(username).subscribe({
        next: (response) => (this.todos = response),
        // error: (error) => this.handleErrorResponse(error),
        complete: () => console.log('Request to TodoService completed'),
      });
    }
  }

  deleteTodo(id: number) {
    // this.todoService.deleteTodo(id);
    // this.todos = this.todoService.getTodos(); // refresh

    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';

    const username = this.auth.getLoggedInUsername();
    if (username) {
      this.todoService.deleteTodo(username, id).subscribe({
        next: (response) => {
          this.successMessage = 'Deleted successfully!';
          this.refreshTodos();
        },
        error: (error) => {
          this.errorMessage = `Error!: ${error}`;
          console.log(`Error!: ${error}`);
        },
        complete: () => console.log('Request to delete todo completed'),
      });
    }
  }

  updateTodo(todoid: number){
      this.router.navigate(['todos',todoid]);
  }
}
