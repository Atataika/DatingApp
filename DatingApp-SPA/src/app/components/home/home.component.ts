import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isRegisterMode: boolean;

  constructor() {}

  public registerToggle(): void {
    this.isRegisterMode = true;
  }

  public cancelRegisterMode(): void {
    this.isRegisterMode = false;
  }
}
