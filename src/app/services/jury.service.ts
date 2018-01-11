import { Injectable } from '@angular/core';
import { ProjectApplication } from '../models/projectApplication';
import { Comment } from "../models/comment";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Evaluation } from '../models/evaluation';
import { of } from 'rxjs/observable/of';

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

  updateEvaluationOfProject(idProject:String, evaluation: Evaluation){
    this.http.post(this.baseUrl + idProject + "/evaluation", evaluation).toPromise().catch(this.handleError);
  }

  saveCommentOfProject(idProject:String, comment: Comment){
    this.http.post(this.baseUrl + idProject + "/comment", comment).toPromise().catch(this.handleError);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
