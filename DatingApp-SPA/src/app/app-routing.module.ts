import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberDetailComponent } from './components/member-list/components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './shared/resolvers/member-detail.resolver';
import { MemberEditResolver } from './shared/resolvers/member-edit.resolver';
import { MemberListResolver } from './shared/resolvers/member-list.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
