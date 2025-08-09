import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Welcome } from './components/welcome/welcome';
import { RouteGuard } from './service/route-guard';
import { TodoItem } from './components/todos/todo-item/todo-item';
import { TodoList } from './components/todos/todo-list/todo-list';

//Order is important 
export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'welcome/:name', component: Welcome, canActivate:[RouteGuard] },
  { path: 'todos/:id', component: TodoItem , canActivate:[RouteGuard] },
  { path: 'todos', component: TodoList, canActivate:[RouteGuard] },
  { path: '**', component: Error }
];