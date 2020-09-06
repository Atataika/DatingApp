import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() onCancelRegister = new EventEmitter<void>();

  public user: User;
  public registerForm: FormGroup;

  public bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-red',
  };

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.initForm();
  }

  public register() {
    this.user = this.registerForm.value;
    this.authService.register(this.user).subscribe(
      () => this.alertify.success('Registration successful.'),
      (error) => this.alertify.error(error),
      () =>
        this.authService
          .login(this.user)
          .subscribe(() => this.router.navigate(['/members']))
    );
  }

  public cancel() {
    this.onCancelRegister.emit();
  }

  private initForm(): FormGroup {
    return this.fb.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
        gender: ['male'],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  private passwordMatchValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors =>
      group.get('password').value === group.get('confirmPassword').value
        ? null
        : { mismatch: true };
  }
}
