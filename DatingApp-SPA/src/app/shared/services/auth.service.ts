import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public decodedToken: any;
  public currentUser: User;

  public currentPhotoUrl = new BehaviorSubject<string>('../../assets/user.png');

  private baseUrl = environment.baseUrl + 'auth/';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public changeMemberPhoto(photoUrl: string) {
    this.currentPhotoUrl.next(photoUrl);
  }

  public login(user: any): Observable<void> {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', user).pipe(
      map((res: LoginResponse) => {
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentUser = res.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  public register(user: User): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'register', user);
  }

  public checkIsUserLoggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
