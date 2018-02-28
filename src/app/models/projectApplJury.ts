import { Budget } from './budget';
import { Description } from './description';
import { Evaluation } from './evaluation';
import { InterviewEvaluation } from './interviewEvaluation';
import { interceptingHandler } from '@angular/common/http/src/module';

export class ProjectApplJury {

    id          : String;
    budget      : Budget;
    description : Description;
    evalution   : Evaluation;
    comments    : Array<Comment>
    confirmed   : boolean;
    interviewEvaluation :InterviewEvaluation;
    approvedToSecondStag:boolean; 

    constructor(id:String, budget: Budget, description: Description, confirmed: boolean, evalution:Evaluation, comments:Array<Comment>, interviewEvaluation :InterviewEvaluation, approvedToSecondStag:boolean){
        this.id          = id;
        this.budget      = budget;
        this.description = description;
        this.evalution   = evalution;
        this.comments    = comments;
        this.confirmed   = confirmed;
        this.interviewEvaluation = interviewEvaluation;
        this.approvedToSecondStag = approvedToSecondStag;
    }

} 