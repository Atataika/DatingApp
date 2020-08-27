import { Component, OnInit } from '@angular/core';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: UserRequest = { username: null, password: null };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      () => console.log('Logged in successfuly'),
      (error) => console.log('Failed to login', error)
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
