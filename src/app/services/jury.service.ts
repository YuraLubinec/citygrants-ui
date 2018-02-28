import { Injectable } from '@angular/core';
import { ProjectApplication } from '../models/projectApplication';
import { Comment } from "../models/comment";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Evaluation } from '../models/evaluation';
import { of } from 'rxjs/observable/of';
import { CostItem } from '../models/costItem';
import { BudgetCalculations } from '../models/budgetCalculations';
import { Budget } from '../models/budget';
import { InterviewEvaluation } from '../models/interviewEvaluation';

@Injectable()
export class JuryService {

  private baseUrl: string;
  private juryId = '21';

  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8082/citygrants/jury/project/';
  }

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl + this.juryId);
  }

  updateEvaluationOfProject(idProject:String, evaluation: Evaluation){
    this.http.post(this.baseUrl + idProject + "/evaluation", evaluation).toPromise().catch(this.handleError);
  }

  updateInterviewEvaluationOfProject(idProject:String, evaluation: InterviewEvaluation){
    console.log("service is working : " + this.baseUrl + idProject + "/interviewEvaluation");
    console.log(evaluation);
    this.http.post(this.baseUrl + idProject + "/interviewEvaluation", evaluation).toPromise().catch(this.handleError);
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
