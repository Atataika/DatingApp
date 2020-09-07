import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(
    page?: string | number,
    itemsPerPage?: string | number,
    userParams?: any
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params
        .append('pageNumber', `${page}`)
        .append('pageSize', `${itemsPerPage}`);
    }

    if (userParams) {
      params = params
        .append('minAge', `${userParams.minAge}`)
        .append('maxAge', `${userParams.maxAge}`)
        .append('gender', `${userParams.gender}`)
        .append('orderBy', `${userParams.orderBy}`);
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;

          if (res.headers.get('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + `users/${id}`);
  }

  public updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(this.baseUrl + `users/${id}`, user);
  }

  public setMainPhoto(userId: number, id: number): Observable<void> {
    return this.http.post<void>(
      this.baseUrl + `users/${userId}/photos/${id}/setMain`,
      {}
    );
  }

  public deletePhoto(userId: number, id: number): Observable<void> {
    return this.http.delete<void>(
      this.baseUrl + `users/${userId}/photos/${id}`
    );
  }
}
