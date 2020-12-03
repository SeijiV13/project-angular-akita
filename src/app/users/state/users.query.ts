import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsersStore, UsersState } from './users.store';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersQuery extends QueryEntity<UsersState, User> {

  constructor(protected store: UsersStore) {
    super(store);
  }

}
