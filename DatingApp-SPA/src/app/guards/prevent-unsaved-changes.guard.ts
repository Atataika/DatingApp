import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../components/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard
  implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean {
    const warnStr =
      'Are you sure you want to continue? Any unsaved changes will be lost';

    return component.editForm.dirty ? confirm(warnStr) : true;
  }
}
