import { OnInit, Component, Inject, ViewEncapsulation, Directive, ViewChildren, QueryList } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";
import { JuryService } from "../services/jury.service";
import { Comment } from "../models/comment";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { FileInfo } from "../models/fileInfo";
import { BudgetCalculations } from "../models/budgetCalculations";
import { InterviewEvaluation } from "../models/interviewEvaluation";
import { User } from "../models/user";
import { AdminService } from "../services/admin.service";
import { LOGIN, BASEURL } from "../constants/projectConstants";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-project-dialog-page',
    templateUrl: './project-dialog-page.component.html',
    styleUrls: ['./project-dialog-page.component.css'],
    providers: [JuryService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class JuryDialogPageComponent {
    private id                 :String;
    private projectDescription :Description;
    private projectBudget      :Budget;
    private evaluation         :Evaluation;
    private comments           :Array<Comment>;
    private comment            :Comment;
    private filesInfo          :Array<FileInfo>;
    private commentText        :string;
    private step               = 0;
    private calculations       : BudgetCalculations;
    private approvedToSecondStage : boolean;
    private interviewEvaluation   : InterviewEvaluation;
    private basUrl                = BASEURL;

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private juryService: JuryService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar, public dialogProject: MatDialogRef<JuryDialogPageComponent>,) {
        this.id                 = data.id;
        this.projectDescription = data.description;
        this.projectBudget      = data.budget;
        this.evaluation         = data.evaluation;
        this.comments           = data.comments;
        this.filesInfo          = data.filesInfo;
        this.commentText        = "";
        this.step               = 0;
        this.approvedToSecondStage = data.approvedToSecondStage;
        this.interviewEvaluation   = data.interviewEvaluation;

        this.calculations = this.juryService.calculateBudget(this.projectBudget);
    }

    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveEvaluation(){

      this.evaluation.juryMemberName = localStorage.getItem(LOGIN);
      this.juryService.updateEvaluationOfProject(this.id, this.evaluation);

      this.snackBar.open('Дякуємо за Ваше оцінювання !!!','', {
        duration: 1500,
      });

      this.dialogProject.close();
    }

    saveInterviewEvaluation(){
      this.interviewEvaluation.juryMemberName = localStorage.getItem(LOGIN);

      this.juryService.updateInterviewEvaluationOfProject(this.id, this.interviewEvaluation);

      this.snackBar.open('Дякуємо за Ваше оцінювання !!!','', {
        duration: 1500,
      });

      this.dialogProject.close();
    }

    saveComment(){
      const dateNow = new Date();
      const idComment = 'idComment' + dateNow.getFullYear() 
                                      + dateNow.getMonth() 
                                      + dateNow.getDay() 
                                      + dateNow.getHours()
                                      + dateNow.getMinutes()
                                      + dateNow.getSeconds() 
                                      + dateNow.getMilliseconds();
        const tempComment = new Comment(idComment,"", localStorage.getItem(LOGIN), this.commentText, new Date);
        this.juryService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
      }

      isDisableCommentButton(){
        return this.commentText.length <= 0 ? true:false;
      }

      getFileInfo(idFile:string){
        this.juryService.getFileInfo(idFile);
      }  
}
