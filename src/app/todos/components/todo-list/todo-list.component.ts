import { TodosService } from './../../state/todos.service';
import { Todo } from './../../state/todo.model';
import { TodosQuery } from './../../state/todos.query';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todosQuery.selectAll();

  constructor(private todosQuery: TodosQuery, private todosService: TodosService) { }

  ngOnInit(): void {
    this.todosQuery.selectAreTodosLoaded$.pipe(
      switchMap(loaded => {
        if (!loaded) {
          return this.todosService.getAllTodos();
        }
        return [];
      })
    ).subscribe();
  }

  createTodo(): void {
    const todo = {
      name: 'this is a test',
      description: 'hey im a new todo'
    } as Todo;
    this.todosService.createTodo(todo).subscribe();
  }

  deleteTodo(id: string): void {
   this.todosService.deleteTodo(id).subscribe();
  }

}
