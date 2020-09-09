import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;

  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  public loadMessages() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(
        (messages) => {
          this.messages = messages;
        },
        (err) => this.alertify.error(err)
      );
  }

  public sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        (err) => this.alertify.error(err)
      );
  }
}
