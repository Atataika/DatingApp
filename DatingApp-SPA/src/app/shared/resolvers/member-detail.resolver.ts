import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UsersService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params.id).pipe(
      catchError((error) => {
        this.alertify.error(`Problem retriving data ${error}`);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
