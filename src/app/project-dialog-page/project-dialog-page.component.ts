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
    private evaluation:Evaluation;
    private step = 0;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.projectDescription = data.description;
        this.projectBudget = data.budget;
        this.evaluation = data.evaluation;
        this.step = 0;
        console.log(data);
    }
}