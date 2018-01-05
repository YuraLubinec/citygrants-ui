import { Budget } from './budget';
import { Description } from './description';
import { Evaluation } from './evaluation';

export class ProjectApplJury {

    id          : String;
    budget      : Budget;
    description : Description;
    evalution   : Evaluation;
    comments    : Array<Comment>
    confirmed   : boolean;

    constructor(id:String, budget: Budget, description: Description, confirmed: boolean, evalution:Evaluation, comments:Array<Comment>){
        this.id          = id;
        this.budget      = budget;
        this.description = description;
        this.evalution   = evalution;
        this.comments    = comments;
        this.confirmed   = confirmed;
        
    }

} 