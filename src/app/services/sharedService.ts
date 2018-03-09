import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {
    public IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();
}