import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_TOKEN, AUTH_HEADER } from '../constants/projectConstants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const TOKEN = localStorage.getItem(AUTH_TOKEN);
        if (TOKEN) {
            const cloned = req.clone({
                headers: req.headers.set(AUTH_HEADER, TOKEN)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}