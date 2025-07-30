import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {

    todos: Todo[] = [];

    initializeTodos(todos: Todo[]) {
        this.todos = todos;
    }
    private generateNextId(): number {
        // Spread operator ... unpacks the array into individual arguments.
        return this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    deleteTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    addTodo(description: string, targetDate: Date): void {
        const newTodo: Todo = {
            id: this.generateNextId(),
            description,
            done: false,
            targetDate
        };
        this.todos.push(newTodo);
    }

    // You can add more: addTodo(), updateTodo(), etc.
}
