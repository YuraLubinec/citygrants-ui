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

    constructor(id:string, budget: Budget, description: Description, confirmed: boolean, approvedToSecondStage : boolean,
                evaluations : Array<Evaluation>, interviewEvaluations  : Array<InterviewEvaluation>, comments:Array<any>,
                filesInfo:Array<FileInfo>,totalEvalFirstStage : number, totalEvalSecondStage:number) {

        this.id                    = id;
        this.budget                = budget;
        this.description           = description;
        this.confirmed             = confirmed;
        this.approvedToSecondStage = approvedToSecondStage;
        this.evaluations           = evaluations;
        this.interviewEvaluations  = interviewEvaluations;
        this.comments              = comments;  
        this.filesInfo             = filesInfo;
        this.totalEvalFirstStage   = totalEvalFirstStage;
        this.totalEvalSecondStage  = totalEvalSecondStage;
    }

}