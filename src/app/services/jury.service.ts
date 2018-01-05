import { Injectable } from '@angular/core';
import { ProjectApplication } from '../models/projectApplication';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JuryService {

  private baseUrl: string;
  private juryId = '15';


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8082/citygrants/jury/project/';
  }

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl + this.juryId);
  }

  private handlePromiseError(err): Promise<any> {return Promise.reject(err);}
}
