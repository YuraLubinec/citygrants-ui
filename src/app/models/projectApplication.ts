import { Budget } from './budget';
import { Description } from './description';
import { Evaluation } from './evaluation';

export class ProjectApplication {

    budget: Budget;
    description: Description;
    evalutions:Array<Evaluation>;
    confirmed: boolean;

    constructor(budget: Budget, description: Description, confirmed: boolean, evalutions:Array<Evaluation>){
        this.budget = budget;
        this.description = description;
        this.confirmed = confirmed;
        this.evalutions = evalutions
    }

} 