import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './todo.model';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})

export class TodoList {

  tasks: Task[] = [];
  newTask: string = '';
  addTask(task: string){
    if (task.trim()) { //prevent adding empty string
      this.tasks.push({ title: task.trim(), done: false });
      this.newTask = '';
  }
  
}

removeTask(index: number){
  this.tasks.splice(index,1);
}

}
