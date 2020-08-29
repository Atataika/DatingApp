import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/home/components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
