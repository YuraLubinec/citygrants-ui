import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ROLE, AUTH_TOCKEN } from '../../constants/projectConstants';

@Injectable()
export class ApplFormGuard implements CanActivate {

    constructor(private router: Router) { }


    canActivate() {

        if (!localStorage.getItem(AUTH_TOCKEN)) {
            return true;
        } else if (localStorage.getItem(ROLE) == 'ADMIN') {
            this.router.navigate(['/admin']);
            return false;
        } else {
            this.router.navigate(['/jury']);
            return false;
        }
    }

}