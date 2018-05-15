import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

import {LocalStorageService} from '../services/locastorage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).do(event => {
    }, err => {

      if (err instanceof HttpErrorResponse && err.status == 403) {
        this.localStorageService.clearLocalStorage();
        alert("you are not authorized or your permission expired")
      }
      else if (err instanceof HttpErrorResponse && err.status == 401) {
        this.localStorageService.clearLocalStorage();
        alert("you are not authenticated to use this service")
      }
      else if (err instanceof HttpErrorResponse && err.status == 400) {
        return;
      }
      else {
        alert("server error, please try again later")
      }
      this.router.navigate(['/login']);
    });
  }

}
