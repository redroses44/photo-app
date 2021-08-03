import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.url)
  }
}
