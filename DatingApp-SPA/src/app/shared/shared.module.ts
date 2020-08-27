import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  providers: [AuthService],
  imports: [CommonModule],
})
export class SharedModule {}
