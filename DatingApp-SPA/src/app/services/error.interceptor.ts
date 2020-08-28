import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }

        this.checkIsServerRelatedError(error);
        const modelStateErrors = this.checkIsModelRelatedError(error);

        return throwError(
          modelStateErrors || error.error || 'Unrecognized server error'
        );
      })
    );
  }

  private checkIsServerRelatedError(
    error: HttpErrorResponse
  ): Observable<never> {
    const applicationError = error.headers.get('Application-Error');

    if (applicationError) {
      return throwError(applicationError);
    }
  }

  private checkIsModelRelatedError(error: HttpErrorResponse): string {
    const serverError = error.error;
    let modelStateErrors = '';

    if (serverError.errors && typeof serverError.errors === 'object') {
      for (const key in serverError.errors) {
        if (serverError.errors[key]) {
          modelStateErrors += serverError.errors[key] + '\n';
        }
      }
    }

    return modelStateErrors;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
