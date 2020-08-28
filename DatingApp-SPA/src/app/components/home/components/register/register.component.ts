import { Component, EventEmitter, Output } from '@angular/core';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() onCancelRegister = new EventEmitter<void>();

  public model: UserRequest = { username: null, password: null };

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  public register() {
    this.authService.register(this.model).subscribe(
      () => this.alertify.success('Registration successful.'),
      (error) => this.alertify.error(error)
    );
  }

  public cancel() {
    this.onCancelRegister.emit();
  }
}
