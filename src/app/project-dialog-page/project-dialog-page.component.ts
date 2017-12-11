import { OnInit, Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'app-project-dialog-page',
    templateUrl: './project-dialog-page.component.html',
    styleUrls: ['./project-dialog-page.component.css'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })


export class JuryDialogPageComponent {

    private projectDescription:any;
    private projectBudget:any;
    private evalActual:Number;
    private evalIntelligibility:Number;
    private evalCompetence:Number;
    private evalStability:Number;
    private evalEfficiency:Number;
    private evalInnovation:Number;
    private evalEvalAttracting:Number;
    private evalСooperation:Number;

    private step = 0;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.projectDescription = data.description;
        this.projectBudget = data.budget;
        this.step = 0;
    }

    setStep(index: number) {
        this.step = index;
      }
    
      nextStep() {
        this.step++;
      }
    
      prevStep() {
        this.step--;
      }
}