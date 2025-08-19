import { Todo } from './../../model/todo.model';
import { APIConstant } from './../../constants/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoData {

  constructor(private HttpClient: HttpClient){}

  retrieveAllTodos(username:string){

    // return this.HttpClient.get<Todo[]>(`http://localhost:8080/api/v1/users/${username}/todos`);
    return this.HttpClient.get<Todo[]>(`${environment.API_URL}${APIConstant.Todo.base}${APIConstant.Todo.all(username)}`);
  }


  getTodoById(username: string, todoId: number){

    return this.HttpClient.get<Todo>(`${environment.API_URL}${APIConstant.Todo.base}${APIConstant.Todo.getById(username,todoId)}`);
  }

  deleteTodo(username: string, todoId: number){
    // return this.HttpClient.delete(`http://localhost:8080/api/v1/users/${username}/todos/${todoId}`);
    return this.HttpClient.delete(`${environment.API_URL}${APIConstant.Todo.base}${APIConstant.Todo.deleteTodo(username,todoId)}`)
  }

  updateTodo(username: string, todoId: number, todo: Todo){
    return this.HttpClient.put<Todo>(`${environment.API_URL}${APIConstant.Todo.base}${APIConstant.Todo.updateTodo(username,todoId)}`
                              ,todo);
  }

  addNewTodo(username:string, todo:Todo){
 // remove id by destructuring - To prevent sending id to Hibernate as it'll cause an error
//  By default, Hibernate decides whether to INSERT or UPDATE based on whether the entity’s id is null or has a value.
// If id == null → Hibernate issues an INSERT.
// If id != null → Hibernate assumes it’s an existing row → issues an UPDATE.
// 
// you’re passing a Todo with id = 0 from the client (probably in the JSON body). 
// Hibernate then tries to update row id=0 → but it doesn’t exist → exception.

  const { id, ...todoWithoutId } = todo;
  return this.HttpClient.post<Todo>(`${environment.API_URL}${APIConstant.Todo.base}${APIConstant.Todo.addTodo(username)}`
                              , todoWithoutId
);

  }
  
}
