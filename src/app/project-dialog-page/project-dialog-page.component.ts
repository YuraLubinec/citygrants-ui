import { OnInit, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'app-project-dialog-page',
    templateUrl: './project-dialog-page.component.html',
    styleUrls: ['./project-dialog-page.component.css'],
    providers: []
  })


export class JuryDialogPageComponent {

    private projectDescription:any;
    private projectBudget:any;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.projectDescription = data.description;
        this.projectBudget = data.budget;
        console.log(this.projectBudget);
        console.log(data);
    }
}