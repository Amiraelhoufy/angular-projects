import { Todo } from './../../model/todo.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoData } from '../../service/data/todo-data';
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
  todo: Todo = {  // Dummy values to avoid async loading undefined object
  id: 0,
  description: '',
  done: false,
  targetDate: new Date()
  };
  minDate?: string;
  errorMessage: string= '';
  successMessage : string = '';
  
  constructor(private todoService: TodoData,
    private route: ActivatedRoute,
    private auth:HardcodedAuthentication
  ){

  }

  ngOnInit(): void {
  
  const today = new Date();
  this.minDate = today.toISOString().split('T')[0]; // format: yyyy-MM-dd

  this.id = Number(this.route.snapshot.params['id']);
    if(this.id !== -1){
      this.getTodo();
    }
  }

  getTodo(){
    
    const username = this.auth.getLoggedInUsername();

    if (username) {
     this.todoService.getTodoById(username,this.id).subscribe({
        next: (response) =>  this.todo = response,
        error: (error) => this.handleErrorResponse(error)
        // complete: () => console.log('Request to TodoService completed'),
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

  saveTodo(){        
    this.errorMessage = '';
    this.successMessage = '';
    const username = this.auth.getLoggedInUsername();

    if (username) {
      if(this.id==-1){
          // Create New Todo        
          this.todoService.addNewTodo(username,this.todo).subscribe({
              next: (response) => {
                this.todo = response;
                this.successMessage = 'Added successfully!'
              },
              error: (error) => this.handleErrorResponse(error)
              // complete: () => console.log('Request to TodoService completed')
          }
          );
          }else{
          // Update Todo
            this.todoService.updateTodo(username,this.todo.id,this.todo).subscribe({
                next: (response) => {
                  this.todo = response;
                  this.successMessage = 'updated successfully!'
                },
                error: (error) => this.handleErrorResponse(error)
                // complete: () => console.log('Request to TodoService completed')
            }
            );
    }
  }
}


isNew(){
  return this.id === -1? true: false;
}
}
