import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../models/message';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesResolver implements Resolve<Message[]> {
  private pageNumber = 1;
  private pageSize = 5;
  private messageContainer = 'Unread';

  constructor(
    private userService: UsersService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  resolve(): Observable<Message[]> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .pipe(
        catchError((error) => {
          this.alertify.error(`Problem retriving messages ${error}`);
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
