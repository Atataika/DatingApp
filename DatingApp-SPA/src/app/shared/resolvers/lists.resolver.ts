import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class ListsResolver implements Resolve<User[]> {
  private pageNumber = 1;
  private pageSize = 5;
  likesParam = 'Likers';

  constructor(
    private userService: UsersService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(): Observable<User[]> {
    return this.userService
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError((error) => {
          this.alertify.error(`Problem retriving data ${error}`);
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
