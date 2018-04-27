import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ROLE, LOGIN } from '../../constants/projectConstants';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }


    canActivate() {

        if (localStorage.getItem(ROLE) == 'ADMIN') {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}