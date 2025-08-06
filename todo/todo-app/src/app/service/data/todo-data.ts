import { Todo } from './../../model/todo.model';
import { APIConstant } from './../../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoData {

  constructor(private HttpClient: HttpClient){}

  retrieveAllTodos(username:string){
    // return this.HttpClient.get<Todo[]>(`http://localhost:8080/api/v1/users/${username}/todos`);
    return this.HttpClient.get<Todo[]>(`${environment.API_URL}${APIConstant.Todo.all(username)}`);
  }


  getTodoById(username: string, todoId: number){
    return this.HttpClient.get<Todo>(`${environment.API_URL}${APIConstant.Todo.getById(username,todoId)}`);
  }

  deleteTodo(username: string, todoId: number){
    // return this.HttpClient.delete(`http://localhost:8080/api/v1/users/${username}/todos/${todoId}`);
    return this.HttpClient.delete(`${environment.API_URL}${APIConstant.Todo.deleteTodo(username,todoId)}`)
  }

  updateTodo(username: string, todoId: number, todo: Todo){
    return this.HttpClient.put<Todo>(`${environment.API_URL}${APIConstant.Todo.updateTodo(username,todoId)}`
                              ,todo);
  }

  addNewTodo(username:string, todo:Todo){
    return this.HttpClient.post<Todo>(`${environment.API_URL}${APIConstant.Todo.addTodo(username)}`
                              ,todo);

  }

  
}
