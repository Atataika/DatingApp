import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { first } from 'rxjs/operators';
import { Photo } from 'src/app/shared/models/Photo';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() onPhotoChange = new EventEmitter<string>();

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;

  private baseUrl = environment.baseUrl;

  constructor(
    private authSertive: AuthService,
    private userService: UsersService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.uploader = this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUploader(): FileUploader {
    const uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.authSertive.decodedToken.nameid}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    uploader.onSuccessItem = (item, response) => {
      if (response) {
        const photo: Photo = JSON.parse(response);

        this.photos.push(photo);
      }
    };

    return uploader;
  }

  public setMainPhoto(photo: Photo): void {
    this.userService
      .setMainPhoto(this.authSertive.decodedToken.nameid, photo.id)
      .pipe(first())
      .subscribe(
        () => {
          const currentMainPhoto = this.photos.find((p) => p.isMain === true);
          currentMainPhoto.isMain = false;
          photo.isMain = true;
          this.authSertive.changeMemberPhoto(photo.url);
          this.authSertive.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authSertive.currentUser)
          );
        },
        (error) => this.alertify.error(error)
      );
  }

  public deletePhoto(id: number): void {
    this.alertify.confirm('Are you sure yo want to delete this photo?', () => {
      this.userService
        .deletePhoto(this.authSertive.decodedToken.nameid, id)
        .pipe(first())
        .subscribe(
          () => {
            this.photos.splice(
              this.photos.findIndex((p) => p.id === id),
              1
            );
            this.alertify.success('Photo has been deleted');
          },
          (error) => this.alertify.error(`Failed to delete hte photo ${error}`)
        );
    });
  }
}
