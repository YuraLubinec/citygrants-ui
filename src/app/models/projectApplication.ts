import { Budget } from './budget';
import { Description } from './description';
import { Evaluation } from './evaluation';

export class ProjectApplication {

    budget: Budget;
    description: Description;
    confirmed: boolean;

    constructor(budget: Budget, description: Description, confirmed: boolean){
        this.budget = budget;
        this.description = description;
        this.confirmed = confirmed;
    }

} 