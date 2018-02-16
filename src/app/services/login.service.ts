import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { BASEURL, ROLE, LOGIN } from '../constants/projectConstants';
import { User } from '../models/user';

const URLSUFFIXLOGIN: string = '/login';
const URLSUFFIXAUTHORIZATION: string = '/authority';
const HEADERCONTENTTYPE: string = 'Content-Type';
const HEADERVALUE: string = 'application/x-www-form-urlencoded';
const BODYUSERNAME: string = 'username=';
const BODYPASSWORD: string = '&password=';

@Injectable()
export class LoginService {

  constructor(private http: Http, private router: Router) {

  }

  login(login: string, password: string): Promise<void | Response> {

    let headers = new Headers({ HEADERCONTENTTYPE: HEADERVALUE });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(BASEURL + URLSUFFIXLOGIN, BODYUSERNAME + login + BODYPASSWORD + password, options)
      .toPromise().
      then(() => this.persistUser(login)).then(this.moveToHomePage()).
      catch(this.handleError);
  }

  private saveCurrentUsetToSessionStorage(login: string, role: string) {

    sessionStorage.setItem(LOGIN, login);
    sessionStorage.setItem(ROLE, role);
  }

  private persistUser(login: string): Promise<void | Response> {

    return this.http.get(BASEURL + URLSUFFIXAUTHORIZATION)
      .toPromise().then(data => {
        this.saveCurrentUsetToSessionStorage(login, data.json().role)
      }).catch(error => this.handleAuthenticationError(error));
  }

  private handleAuthenticationError(error: any): void {
  }

  private handleError(error: any): void {

    if (error.status !== 401) {
      alert('Unexpected authentication error: ' + error);
    }
  }

  private moveToHomePage(): any {
    alert(sessionStorage.getItem(ROLE));
    throw new Error("Method not implemented.");
  }





}
