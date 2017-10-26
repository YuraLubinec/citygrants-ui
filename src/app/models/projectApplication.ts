import { Budget } from './budget';
import { Description } from './description';

export class ProjectApplication {

    private budget: Budget;
    private description: Description;
    private confirmed: boolean;

    constructor(budget: Budget, description: Description, confirmed: boolean) {
        this.budget = budget;
        this.description = description;
        this.confirmed = confirmed;
    }

} 