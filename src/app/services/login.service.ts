import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASEURL, ROLE, LOGIN, AUTH_TOCKEN, AUTH_HEADER } from '../constants/projectConstants';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { LocalStorageService } from './locastorage.service';

const URLSUFFIXLOGIN: string = 'login';
const URLSUFFIXAUTHORIZATION: string = 'authority';
const HEADERCONTENTTYPE: string = 'Content-Type';
const HEADERVALUE: string = 'application/x-www-form-urlencoded';
const BODYUSERNAME: string = 'login=';
const BODYPASSWORD: string = '&password=';

@Injectable()
export class LoginService {

  private authenticated: boolean;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private router: Router) {

  }

  login(login: string, password: string): Observable<boolean> {

    this.localStorageService.clearLocalStorage();
    return this.http.post(BASEURL + URLSUFFIXLOGIN, BODYUSERNAME + login + BODYPASSWORD + password,
      { headers: new HttpHeaders().append(HEADERCONTENTTYPE, HEADERVALUE), observe: 'response' }).map((response: HttpResponse<any>) => {

        const token = response.headers.get(AUTH_HEADER);
        if (token) {
          this.localStorageService.saveTokenToLocalStorage(token);
          this.persistUser(login).subscribe(data => {
            this.localStorageService.saveCurrentUsetToLocalStorage(login, data.role);
            this.moveToHomePage();
          });
          return true;
        }
        else {
          return false
        }
      })
  }

  logout() {

    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/login'])
  }

  private persistUser(login: string): Observable<any> {

    return this.http.get(BASEURL + URLSUFFIXAUTHORIZATION);
  }

  private moveToHomePage(): any {

    if (localStorage.getItem(ROLE) == 'ADMIN') {
      this.router.navigate(['/admin'])
    } else if (localStorage.getItem(ROLE) == 'ADMIN') {
      this.router.navigate(['/jury'])
    } else {
      throw new Error("No such role");
    }
  }

}
