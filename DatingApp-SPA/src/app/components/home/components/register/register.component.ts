import { Component, EventEmitter, Output } from '@angular/core';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() onCancelRegister = new EventEmitter<void>();

  public model: UserRequest = { username: null, password: null };

  constructor(private authService: AuthService) {}

  public register() {
    this.authService.register(this.model).subscribe(
      () => console.log('registration successful'),
      (error) => console.log(error)
    );
  }

  public cancel() {
    this.onCancelRegister.emit();
  }
}
