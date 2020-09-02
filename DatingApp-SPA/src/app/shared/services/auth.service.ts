import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl + 'auth/';
  private jwtHelper = new JwtHelperService();
  public decodedToken: any;

  constructor(private http: HttpClient) {}

  public login(model: UserRequest): Observable<void> {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', model).pipe(
      map((res: LoginResponse) => {
        if (res) {
          localStorage.setItem('token', res.token);
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
        }
      })
    );
  }

  public register(model: UserRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'register', model);
  }

  public checkIsUserLoggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
