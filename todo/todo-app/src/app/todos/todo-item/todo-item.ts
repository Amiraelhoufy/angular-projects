import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoData } from '../../service/data/todo-data';
import { Todo } from '../todo.model';
import { HardcodedAuthentication } from '../../service/hardcoded-authentication';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem implements OnInit {

  id !: number; // ! :  to tell TypeScript not to worry as it's assigned in ngOnInit()
  todo: Todo = {
  id: 0,
   description: '',
   done: false,
   targetDate: new Date()
}; // Dummy values to avoid async loading undefined object
  errorMessage: string= '';

  constructor(private todoService: TodoData,
    private route: ActivatedRoute,
    private auth:HardcodedAuthentication
  ){

  }

  ngOnInit(): void {
  this.id = Number(this.route.snapshot.params['id']);
  this.getTodo();
  }

  getTodo(){
    
    const username = this.auth.getLoggedInUsername();

    if (username) {
     this.todoService.getTodoById(username,this.id).subscribe({
        next: (response) =>  this.todo = response,
        error: (error) => this.handleErrorResponse(error),
        complete: () => console.log('Request to TodoService completed'),
     });
    }
  }

    handleErrorResponse(error: any) {
    if (error.status === 0 && error.error instanceof ProgressEvent) {
      this.errorMessage =
        'Unable to connect to the server. Please make sure the backend is running.';
    } else if (error.status === 404) {
      this.errorMessage = 'Service not found. Please check the API endpoint.';
    } else {
      this.errorMessage = `Unexpected error: ${error.message}`;
    }
  }

  updateTodo(){

  }
}
