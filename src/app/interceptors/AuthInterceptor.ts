import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_TOCKEN, AUTH_HEADER } from '../constants/projectConstants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const TOCKEN = localStorage.getItem(AUTH_TOCKEN);
        if (TOCKEN) {
            const cloned = req.clone({
                headers: req.headers.set(AUTH_HEADER, TOCKEN)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}