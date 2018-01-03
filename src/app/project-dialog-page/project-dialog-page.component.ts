import { OnInit, Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";


@Component({
    selector: 'app-project-dialog-page',
    templateUrl: './project-dialog-page.component.html',
    styleUrls: ['./project-dialog-page.component.css'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })


export class JuryDialogPageComponent {

    private projectDescription:Description;
    private projectBudget:Budget;
    private evalution:Evaluation;
    private step = 0;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.projectDescription = data.description;
        this.projectBudget = data.budget;
        this.evalution = this.getJuryEvalution(data.evalutions);
        console.log("constract");
        this.step = 0;
    }

     getJuryEvalution(evalutions:Array<Evaluation>) {
      console.log(evalutions);
      return evalutions == null ? this.getDefaultEvalution():evalutions.find(x => x.juryMemberId == "150"); 
    }

    getDefaultEvalution(){
      return new Evaluation("150","Default",5,5,6,2,10,1,5,10)
    }
}