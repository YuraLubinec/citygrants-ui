import { Budget } from './budget';
import { Description } from './description';
import { FileInfo } from './fileInfo';

export class ProjectAdm {

    id                    : string;
    budget                : Budget;
    description           : Description;
    confirmed             : boolean;
    approvedToSecondStage : boolean;
    evaluations           : Array<any>;
    interviewEvaluations  : Array<any>;
    comments              : Array<any>;
    filesInfo             : Array<FileInfo>;
    totalEvalFirstStage   : number;
    totalEvalSecondStage  : number;
    date                  : string;

    constructor(budget: Budget, description: Description, confirmed: boolean) {
        this.budget      = budget;
        this.description = description;
        this.confirmed   = confirmed;
    }

}