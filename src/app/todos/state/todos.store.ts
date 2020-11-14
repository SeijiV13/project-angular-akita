
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Todo } from './todo.model';

export interface TodosState extends EntityState<Todo> {
  areTodosLoaded: boolean;
}


export function createInitialState(): TodosState {
  return {
    areTodosLoaded: false
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState, Todo> {

  constructor() {
    super(createInitialState());
  }

  // tslint:disable-next-line: typedef
  loadTodos(todo: Todo[], loaded: boolean) {
    this.set(todo);
    this.update(state => ({
      ...state,
      areTodosLoaded: loaded
    }));
  }

}

