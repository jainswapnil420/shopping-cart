import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfiles: User[] = [
    {
      name: 'swapnil',
      email: 'jainswapnil90@hotmail.com',
      password: 'Sushma123@',
    },
    {
      name: 'sushma',
      email: 'sushma@hotmail.com',
      password: 'test123@',
    },
    {
      name: 'apoorva',
      email: 'apoorva@hotmail.com',
      password: 'test123@',
    },
  ];

  constructor() {}

  login(requestBody: { email: string; password: string }): Observable<User> {
    let user: User = { name: '', email: '' };
    let user1 = this.userProfiles.find(
      (user) =>
        user.email === requestBody.email &&
        user.password === requestBody.password
    );
    if (user1) {
      user = user1;
    }
    return of({ email: user.email, name: user.name });
  }

  signUp(requestBody: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    this.userProfiles.push(requestBody);
    return of({ email: requestBody.email, name: requestBody.name });
  }
}
