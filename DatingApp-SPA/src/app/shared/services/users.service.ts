import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
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
    userParams?: any,
    likesParam?: any
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

    if (likesParam === 'Likers') {
      params = params.append('likers', `true`);
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', `true`);
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

  public sendLike(id: number, recipientId: number): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + `users/${id}/like/${recipientId}`,
      {}
    );
  }

  public getMessages(
    id: number,
    page?,
    itemsPerPage?,
    messageContainer?
  ): Observable<PaginatedResult<Message[]>> {
    const paginatedResult = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page && itemsPerPage) {
      params = params
        .append('pageNumber', `${page}`)
        .append('pageSize', `${itemsPerPage}`);
    }

    return this.http
      .get<Message[]>(this.baseUrl + `users/${id}/messages`, {
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

  public getMessageThread(
    id: number,
    recipientId: number
  ): Observable<Message[]> {
    return this.http.get<Message[]>(
      this.baseUrl + `users/${id}/messages/thread/${recipientId}`
    );
  }

  public sendMessage(id: number, message: Message): Observable<Message> {
    return this.http.post<Message>(
      this.baseUrl + `users/${id}/messages`,
      message
    );
  }
}
