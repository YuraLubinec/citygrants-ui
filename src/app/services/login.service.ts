import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BASEURL, ROLE, AUTH_HEADER} from '../constants/projectConstants';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {LocalStorageService} from './locastorage.service';
import {SharedService} from './sharedService';

const URLSUFFIXLOGIN: string = 'login';
const URLSUFFIXAUTHORIZATION: string = 'authority';
const HEADERCONTENTTYPE: string = 'Content-Type';
const HEADERVALUE: string = 'application/x-www-form-urlencoded';
const BODYUSERNAME: string = 'login=';
const BODYPASSWORD: string = '&password=';

@Injectable()
export class LoginService {
  private authenticated: boolean;

  constructor(private localStorageService: LocalStorageService, private sharedService: SharedService, private http: HttpClient, private router: Router) {

  }

  login(login: string, password: string): Observable<boolean> {

    this.localStorageService.clearLocalStorage();
    return this.http.post(BASEURL + URLSUFFIXLOGIN, BODYUSERNAME + login + BODYPASSWORD + password,
      {headers: new HttpHeaders().append(HEADERCONTENTTYPE, HEADERVALUE), observe: 'response'})
      .map((response: HttpResponse<any>) => {
        const token = response.headers.get(AUTH_HEADER);
        if (token) {
          this.localStorageService.saveTokenToLocalStorage(token);
          this.persistUser(login).subscribe(data => {
            this.localStorageService.saveCurrentUsetToLocalStorage(login, data.role, data.fullName, data.id);
            this.moveToHomePage();
          });

          return true;
        }
        else {
          this.sharedService.IsUserLoggedIn.next(false);
          this.sharedService.IsUserAdmin.next(false);
          this.sharedService.IsUserJury.next(false);

          return false
        }
      })
  }

  logout() {

    this.localStorageService.clearLocalStorage();
    this.sharedService.IsUserLoggedIn.next(false);
    this.sharedService.IsUserAdmin.next(false);
    this.sharedService.IsUserJury.next(false);
    this.router.navigate(['/login'])
  }

  private persistUser(login: string): Observable<any> {

    return this.http.get(BASEURL + URLSUFFIXAUTHORIZATION);
  }

  private moveToHomePage(): any {

    if (localStorage.getItem(ROLE) == 'ADMIN') {

      this.sharedService.IsUserLoggedIn.next(true);
      this.sharedService.IsUserAdmin.next(true);
      this.sharedService.IsUserJury.next(false);

      this.router.navigate(['/admin'])
    } else if (localStorage.getItem(ROLE) == 'JURYMEMBER') {

      this.sharedService.IsUserLoggedIn.next(true);
      this.sharedService.IsUserAdmin.next(false);
      this.sharedService.IsUserJury.next(true);

      this.router.navigate(['/jury'])
    } else {
      throw new Error("No such role");
    }
  }

}
