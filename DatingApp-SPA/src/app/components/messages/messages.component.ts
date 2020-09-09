import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/models/message';
import { Pagination } from 'src/app/shared/models/pagination';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  public loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (err) => this.alertify.error(err)
      );
  }

  public changePage(e: any): void {
    this.pagination.currentPage = e.page;
    this.loadMessages();
  }

  public deleteMessage(id: number): void {
    this.alertify.confirm(
      'Are you sure yo want to delete this message?',
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex((m) => m.id === id),
                1
              );
              this.alertify.success('Message has been deleted');
            },
            (err) => this.alertify.error(err)
          );
      }
    );
  }
}
