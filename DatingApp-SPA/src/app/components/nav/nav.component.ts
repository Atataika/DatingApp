import { Component } from '@angular/core';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: UserRequest = { username: null, password: null };

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  public get isLoggedIn(): boolean {
    return this.authService.checkIsUserLoggedIn();
  }

  public get username(): string {
    return this.authService.decodedToken?.unique_name;
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      () => this.alertify.success('Logged in successfuly.'),
      (error) => this.alertify.error(error)
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.alertify.message('Logged out.');
  }
}
