import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../model/user";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/admin/users');
  }

  getById(id: number) {
    return this.http.get('/admin/users' + id);
  }

  create(user: User) {
    return this.http.post('/admin/users', user);
  }

  update(user: User) {
    return this.http.put('/admin/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/admin/users/' + id);
  }
}
