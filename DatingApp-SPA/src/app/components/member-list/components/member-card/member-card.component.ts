import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() user: User;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private alertify: AlertifyService
  ) {}

  public sendLike(id: number): void {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        () => this.alertify.success(`You have liked: ${this.user.knownAs}`),
        (err) => this.alertify.error(err)
      );
  }
}
