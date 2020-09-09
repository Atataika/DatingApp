import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;

  public user$: Observable<User>;
  public galleryImages$: Observable<NgxGalleryImage[]>;

  public galleryOptions: NgxGalleryOptions[] = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user$ = this.route.data.pipe(map((data) => data.user));

    this.galleryImages$ = this.getImages();
  }

  public selectTab(tabId: number): void {
    this.memberTabs.tabs[tabId].active = true;
  }

  private getImages(): Observable<NgxGalleryImage[]> {
    return this.user$.pipe(
      first(),
      map((user) =>
        user.photos.map((photo) => ({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description,
        }))
      )
    );
  }
}
