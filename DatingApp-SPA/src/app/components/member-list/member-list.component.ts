import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.users$ = this.route.data.pipe(map((data) => data.users));
  }
}
