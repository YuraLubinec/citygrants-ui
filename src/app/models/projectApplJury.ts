import { Budget } from './budget';
import { Description } from './description';
import { Evaluation } from './evaluation';

export class ProjectApplJury {

    budget      : Budget;
    description : Description;
    evalution   : Evaluation;
    confirmed   : boolean;

    constructor(budget: Budget, description: Description, confirmed: boolean, evalution:Evaluation){
        this.budget      = budget;
        this.description = description;
        this.confirmed   = confirmed;
        this.evalution   = evalution;
    }

} 