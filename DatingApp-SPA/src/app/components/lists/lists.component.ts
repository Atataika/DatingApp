import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Pagination } from 'src/app/shared/models/pagination';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  public users: User[];
  public pagination: Pagination;

  public likesParam = 'Likers';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    //FIXME: Обернуть в observable вместо подписки
    this.route.data.subscribe((data) => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }

  public changePage(e: any): void {
    this.pagination.currentPage = e.page;
    this.loadUsers();
  }

  public loadUsers(): void {
    this.usersService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
      )
      .pipe(first())
      //FIXME: Обернуть в observable вместо подписки
      .subscribe(
        (res) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        (err) => this.alertify.error(err)
      );
  }
}
