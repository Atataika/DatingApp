import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: UserRequest = { username: null, password: null };
  public photoUrl$: Observable<string>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.photoUrl$ = this.authService.currentPhotoUrl;
  }

  public get isLoggedIn(): boolean {
    return this.authService.checkIsUserLoggedIn();
  }

  public get username(): string {
    return this.authService.decodedToken?.unique_name;
  }

  public get userPhoto(): string {
    return this.authService.currentUser?.photoUrl;
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      () => this.alertify.success('Logged in successfuly.'),
      (error) => this.alertify.error(error),
      () => this.router.navigate(['/members'])
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
  }
}
