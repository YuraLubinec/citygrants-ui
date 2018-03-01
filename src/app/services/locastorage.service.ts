import { Injectable } from '@angular/core';
import { BASEURL, ROLE, LOGIN, AUTH_TOCKEN, AUTH_HEADER } from '../constants/projectConstants';

@Injectable()
export class LocalStorageService {

    saveTokenToLocalStorage(token: string) {

        localStorage.setItem(AUTH_TOCKEN, token);
    }

    saveCurrentUsetToLocalStorage(login: string, role: string) {

        localStorage.setItem(LOGIN, login);
        localStorage.setItem(ROLE, role);
    }

    clearLocalStorage() {

        localStorage.removeItem(LOGIN);
        localStorage.removeItem(ROLE);
        localStorage.removeItem(AUTH_TOCKEN);
    }

}