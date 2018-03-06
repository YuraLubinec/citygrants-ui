import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http/src/request';
import { User } from '../models/user';
import { ProjectAdm } from '../models/projectAdm';
import { Evaluation } from '../models/evaluation';
import { Comment } from '../models/comment';
import { BudgetCalculations } from '../models/budgetCalculations';
import { Budget } from '../models/budget';
import { CostItem } from '../models/costItem';
import { BASEURL } from '../constants/projectConstants';

@Injectable()
export class AdminService {

  private baseUserUrl   : string;
  private baseProjectUrl: string;

  constructor(private http: HttpClient) {

    this.baseUserUrl    = BASEURL + 'admin/user';
    this.baseProjectUrl = BASEURL + 'admin/project';
  }

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.baseUserUrl).pipe(catchError(this.handleError("getUserByLogin", [])));

  }
  getUserByLogin(login: string): Observable<User> {

    return this.http.get<User>(this.baseUserUrl + "/" + login).pipe(catchError(this.handleError("getUserByLogin", new User())));
  }

  createUser(user: User) {

    this.http.post(this.baseUserUrl, user).toPromise().catch(this.handleHttpError);
  }

  updateUser(user: User) {

    this.http.put(this.baseUserUrl, user).toPromise().catch(this.handleHttpError);
  }

  deleteUser(id: string) {

    this.http.delete(this.baseUserUrl + "/" + id).toPromise().catch(this.handleHttpError);
  }

  getAllProjects(): Observable<ProjectAdm[]> {

    return this.http.get<ProjectAdm[]>(this.baseProjectUrl).pipe(catchError(this.handleError("getAllProjects", [])));
  }

  updateProject(project: ProjectAdm) {
    this.http.put(this.baseProjectUrl, project).toPromise().catch(this.handleError);
  }

  delete(id: string) {
    this.http.delete(this.baseProjectUrl + "/" + id).toPromise().catch(this.handleHttpError);
  }

  deleteCommentOfProject(idProject:string, idComment:string){
    this.http.delete(this.baseProjectUrl + "/" + idProject + "/comment/" + idComment).toPromise().catch(this.handleHttpError);
  }

  deleteSelectedProject(args:any) {
    for (let entry of args) {
      this.delete(entry.id);
    }
  }

  updateEvaluationOfProject(idProject:String, evaluation: Evaluation){
    this.http.post(this.baseProjectUrl + "/" + idProject + "/evaluation", evaluation).toPromise().catch(this.handleError);
  }

  saveCommentOfProject(idProject:String, comment: Comment){
    this.http.post(this.baseProjectUrl + "/" + idProject + "/comment", comment).toPromise().catch(this.handleError);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  private handleHttpError(error: any) {

    //TO-DO implement unique name validation error notification
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора");
  }

  calculateBudget(budget: Budget): BudgetCalculations {

    let calculations = new BudgetCalculations;

    calculations.totalFeeFromOtherSources = budget.costItemsFee.reduce(this.accCallBackOtherSources, 0);
    calculations.totalFeeFromProgram = budget.costItemsFee.reduce(this.accCallBackOtherProject, 0);

    calculations.totalTransportFromOtherSources = budget.costItemsTransport.reduce(this.accCallBackOtherSources, 0);
    calculations.totalTransportFromProgram = budget.costItemsTransport.reduce(this.accCallBackOtherProject, 0);

    calculations.totalNutritionFromOtherSources = budget.costItemsNutrition.reduce(this.accCallBackOtherSources, 0);
    calculations.totalNutritionFromProgram = budget.costItemsNutrition.reduce(this.accCallBackOtherProject, 0);

    calculations.totalRentFromOtherSources = budget.costItemsRent.reduce(this.accCallBackOtherSources, 0);
    calculations.totalRentFromProgram = budget.costItemsRent.reduce(this.accCallBackOtherProject, 0);

    calculations.totalAdministrativeFromOtherSources = budget.costItemsAdministrative.reduce(this.accCallBackOtherSources, 0);
    calculations.totalAdministrativeFromProgram = budget.costItemsAdministrative.reduce(this.accCallBackOtherProject, 0);

    calculations.totalAdvertisingFromOtherSources = budget.costItemsAdvertising.reduce(this.accCallBackOtherSources, 0);
    calculations.totalAdvertisingFromProgram = budget.costItemsAdvertising.reduce(this.accCallBackOtherProject, 0);

    calculations.totalMaterialsFromOtherSources = budget.costItemsMaterial.reduce(this.accCallBackOtherSources, 0);
    calculations.totalMaterialsFromProgram = budget.costItemsMaterial.reduce(this.accCallBackOtherProject, 0);

    calculations.totalOthersFromOtherSources = budget.costItemsOthers.reduce(this.accCallBackOtherSources, 0);
    calculations.totalOthersFromProgram = budget.costItemsOthers.reduce(this.accCallBackOtherProject, 0);

    calculations.totalFromOtherSources = calculations.totalFeeFromOtherSources + calculations.totalTransportFromOtherSources +
      calculations.totalNutritionFromOtherSources + calculations.totalRentFromOtherSources + calculations.totalAdministrativeFromOtherSources
      + calculations.totalAdvertisingFromOtherSources + calculations.totalMaterialsFromOtherSources + calculations.totalOthersFromOtherSources;

    calculations.totalFromProgram = calculations.totalFeeFromProgram + calculations.totalTransportFromProgram +
      calculations.totalNutritionFromProgram + calculations.totalRentFromProgram + calculations.totalAdministrativeFromProgram
      + calculations.totalAdvertisingFromProgram + calculations.totalMaterialsFromProgram + calculations.totalOthersFromProgram;

    return calculations;
  }

  private accCallBackOtherSources(sum: number, current: CostItem): number {
    return sum + current.consumptionsFromOtherSources;

  }

  private accCallBackOtherProject(sum: number, current: CostItem): number {
    return sum + current.consumptionsFromProgram;

  }


}
