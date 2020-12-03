import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodosStore } from './todos.store';
import { Todo } from './todo.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {

  constructor(private todosStore: TodosStore,
              private http: HttpClient) {
  }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${environment.url}/todos`).pipe(
      tap((data: Todo[]) => {
         this.todosStore.loadTodos(data, true);
      })
    )
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.url}/todos`, todo).pipe(
      tap(value => {
        this.todosStore.add([value]);
      })
    );
  }

  deleteTodo(id: ID): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.url}/todos/${id}`).pipe(
      tap(value => {
        this.todosStore.remove(id);
      })
    );
  }
}
