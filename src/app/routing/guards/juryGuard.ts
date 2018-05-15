import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {ROLE} from '../../constants/projectConstants';

@Injectable()
export class JuryGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {

    if (localStorage.getItem(ROLE) == 'JURYMEMBER' || localStorage.getItem(ROLE) == 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
