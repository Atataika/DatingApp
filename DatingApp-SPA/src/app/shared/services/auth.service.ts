import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response.model';
import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  public login(model: UserRequest): Observable<void> {
    return this.http
      .post<LoginResponse>(this.baseUrl + 'login', model)
      .pipe(
        map((res: LoginResponse) =>
          res ? localStorage.setItem('token', res.token) : null
        )
      );
  }

  public register(model: UserRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'register', model);
  }
}
