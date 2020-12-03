import { TodosStore } from './../../state/todos.store';
import { TodosService } from './../../state/todos.service';
import { Todo } from './../../state/todo.model';
import { TodosQuery } from './../../state/todos.query';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todosQuery.selectAll();

  constructor(private todosQuery: TodosQuery, private todosService: TodosService, private store: TodosStore) { }

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

  selectTodo(id: ID): void {
    this.store.setActive(id);
    const test$ = this.todosQuery.selectActive();
    // tslint:disable-next-line: deprecation
    const test = test$.subscribe((data: Todo[]) => {
      console.log(data);
    }, () => {}, () => {});
    test.unsubscribe();
  }

  createTodo(): void {
    const todo = {
      name: 'this is a test',
      description: 'hey im a new todo'
    } as Todo;
    this.todosService.createTodo(todo).subscribe();
  }

  deleteTodo(id: ID): void {
   this.todosService.deleteTodo(id).subscribe();
  }

  countUsers(): void  {
    this.todosQuery.selectCount().subscribe(data => {
      console.log(data)
    });
  }

}
