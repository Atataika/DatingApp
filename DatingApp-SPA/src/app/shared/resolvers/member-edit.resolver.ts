import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UsersService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error(`Problem retriving your data ${error}`);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
