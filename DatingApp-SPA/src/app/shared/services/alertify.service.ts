import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  public confirm(message: string, okCallback: () => any): void {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
    });
  }

  public success(message: string): void {
    alertify.success(message);
  }

  public error(message: string): void {
    alertify.error(message);
  }

  public warning(message: string): void {
    alertify.warning(message);
  }

  public message(message: string): void {
    alertify.message(message);
  }
}
