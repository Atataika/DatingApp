import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.users$ = this.loadUsers();
  }

  public loadUsers(): Observable<User[]> {
    return this.usersService.getUsers().pipe(
      catchError((err) => {
        this.alertify.error(err);
        return of(null);
      })
    );
  }
}
