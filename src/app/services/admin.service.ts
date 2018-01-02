import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http/src/request';
import { User } from '../models/user';
import { ProjectAdm } from '../models/projectAdm';

@Injectable()
export class AdminService {

  private baseUserUrl: string;
  private baseProjectUrl: string;

  constructor(private http: HttpClient) {

    this.baseUserUrl = 'http://localhost:8082/citygrants/admin/user';
    this.baseProjectUrl = 'http://localhost:8082/citygrants/admin/project';
  }

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.baseUserUrl).pipe(catchError(this.handleError("getUserByLogin", [])));

  }
  getUserByLogin(login: string): Observable<User> {

    return this.http.get<User>(this.baseUserUrl + "/" + login).pipe(catchError(this.handleError("getUserByLogin", new User())));
  }

  createUser(user: User) {

    this.http.post(this.baseUserUrl, user).toPromise().catch(this.handleHttpError);
  }

  updateUser(user: User) {

    this.http.put(this.baseUserUrl, user).toPromise().catch(this.handleHttpError);
  }

  deleteUser(id: string) {

    this.http.delete(this.baseUserUrl + "/" + id).toPromise().catch(this.handleHttpError);
  }

  getAllProjects(): Observable<ProjectAdm[]> {

    return this.http.get<ProjectAdm[]>(this.baseProjectUrl).pipe(catchError(this.handleError("getAllProjects", [])));
  }

  updateProject(project: ProjectAdm) {

    this.http.put(this.baseProjectUrl, project).toPromise().catch(this.handleHttpError);

  }

  delete(id: string) {

    this.http.delete(this.baseProjectUrl + "/" + id).toPromise().catch(this.handleHttpError);
  }



  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  private handleHttpError(error: any) {

    //TO-DO implement unique name validation error notification
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора");
  }


}
