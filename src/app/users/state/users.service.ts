import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UsersStore } from './users.store';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private usersStore: UsersStore,
              private http: HttpClient) {
  }

  get() {
    this.http.get('https://akita.com').subscribe((entities) => this.usersStore.set(entities));
  }

  add(user: User) {
    this.usersStore.add(user);
  }

  update(id, user: Partial<User>) {
    this.usersStore.update(id, user);
  }

  remove(id: ID) {
    this.usersStore.remove(id);
  }
}
