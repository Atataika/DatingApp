import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Pagination } from 'src/app/shared/models/pagination';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  public pagination: Pagination; //FIXME: Избавиться от непоточной пагинации
  public currentUser = JSON.parse(localStorage.getItem('user'));

  public users$: Observable<User[]>;
  public pagination$: Observable<Pagination>;

  public userParams: any = {
    gender: this.currentUser.gender === 'male' ? 'female' : 'male',
    minAge: 18,
    maxAge: 99,
    orderBy: 'lastActive',
  };
  public genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.users$ = this.route.data.pipe(
      map((data) => {
        this.pagination = data.users.pagination;
        return data.users.result;
      })
    );

    this.pagination$ = this.route.data.pipe(
      map((data) => data.users.pagination)
    );

    // this.userParams.gender =
    //   this.currentUser.gender === 'male' ? 'female' : 'male';
    // this.userParams.minAge = 18;
    // this.userParams.maxAge = 99;
  }

  public resetFilters(): void {
    this.userParams.gender =
      this.currentUser.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
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
        this.userParams
      )
      .pipe(first())
      .subscribe(
        (res) => {
          this.users$ = of(res.result);
          this.pagination = res.pagination;
        },
        (err) => this.alertify.error(err)
      );
  }
}
