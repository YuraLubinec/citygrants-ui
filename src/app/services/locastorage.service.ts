import { Injectable } from '@angular/core';
import { BASEURL, ROLE, LOGIN, AUTH_TOCKEN, AUTH_HEADER, FULLNAME, ID } from '../constants/projectConstants';

@Injectable()
export class LocalStorageService {

    saveTokenToLocalStorage(token: string) {

        localStorage.setItem(AUTH_TOCKEN, token);
    }

    saveCurrentUsetToLocalStorage(login: string, role: string, fullName: string, id: string) {

        localStorage.setItem(LOGIN, login);
        localStorage.setItem(ROLE, role);
        localStorage.setItem(FULLNAME, fullName);
        localStorage.setItem(ID, id);
    }

    clearLocalStorage() {

        localStorage.removeItem(LOGIN);
        localStorage.removeItem(ROLE);
        localStorage.removeItem(AUTH_TOCKEN);
    }

}