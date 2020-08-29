import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../shared/services/alertify.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSertive: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this.authSertive.checkIsUserLoggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!');
    this.router.navigate(['/home']);
    return false;
  }
}
