import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Welcome } from './welcome/welcome';
import { TodoList } from './todos/todo-list/todo-list';
import { RouteGuard } from './service/route-guard';
import { TodoItem } from './todos/todo-item/todo-item';

//Order is important 
export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'welcome/:name', component: Welcome, canActivate:[RouteGuard] },
  { path: 'todos/:id', component: TodoItem , canActivate:[RouteGuard] },
  { path: 'todos', component: TodoList, canActivate:[RouteGuard] },
  { path: '**', component: Error }
];