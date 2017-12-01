import { Injectable } from '@angular/core';
import { ProjectApplication } from '../models/projectApplication';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JuryService {

  private baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8082/citygrants/client/project';
  }

  getAllProjects(): Observable<any> {return this.http.get(this.baseUrl);
  }

  private handlePromiseError(err): Promise<any> {return Promise.reject(err);}
}
