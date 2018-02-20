import { Budget } from './budget';
import { Description } from './description';
import { FileInfo } from './fileInfo';
import { Evaluation } from './evaluation';
import { InterviewEvaluation } from './interviewEvaluation';

export class ProjectAdm {

    id                    : string;
    budget                : Budget;
    description           : Description;
    confirmed             : boolean;
    approvedToSecondStage : boolean;
    evaluations           : Array<Evaluation>;
    interviewEvaluations  : Array<InterviewEvaluation>;
    comments              : Array<any>;
    filesInfo             : Array<FileInfo>;
    totalEvalFirstStage   : number;
    totalEvalSecondStage  : number;
    date                  : string;

    constructor(id:string, budget: Budget, description: Description, confirmed: boolean, approvedToSecondStage : boolean,
                evaluations : Array<Evaluation>, interviewEvaluations  : Array<InterviewEvaluation> ) {

        this.budget                = budget;
        this.description           = description;
        this.confirmed             = confirmed;
        this.approvedToSecondStage = approvedToSecondStage;
        this.evaluations           = evaluations;
        this.interviewEvaluations  = interviewEvaluations;
    }

}