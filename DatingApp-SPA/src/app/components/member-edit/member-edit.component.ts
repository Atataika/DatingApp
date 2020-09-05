import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  public user: User;
  public photoUrl$: Observable<string>;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(): boolean {
    return this.editForm.dirty ? false : true;
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        first(),
        map((data) => data.user as User)
      )
      .subscribe((user) => (this.user = user));

    this.photoUrl$ = this.authService.currentPhotoUrl;
  }

  public updateUser() {
    const currentUserId = this.authService.decodedToken.nameid;

    this.userService.updateUser(currentUserId, this.user).subscribe(
      () => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      },
      (error) => this.alertify.error(error)
    );
  }

  public updateMainPhoto(photoUrl: string): void {
    this.user.photoUrl = photoUrl;
  }
}
