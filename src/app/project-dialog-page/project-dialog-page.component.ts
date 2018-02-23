import { OnInit, Component, Inject, ViewEncapsulation, Directive, ViewChildren, QueryList } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";
import { JuryService } from "../services/jury.service";
import { Comment } from "../models/comment";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { FileInfo } from "../models/fileInfo";
import { BudgetCalculations } from "../models/budgetCalculations";

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

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private juryService: JuryService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar) {
        this.id                 = data.id;
        this.projectDescription = data.description;
        this.projectBudget      = data.budget;
        this.evaluation         = data.evaluation;
        this.comments           = data.comments;
        this.filesInfo          = data.filesInfo;
        this.commentText        = "";
        this.step               = 0;

        this.calculations = this.juryService.calculateBudget(this.projectBudget);
    }

    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveEvaluation(){
      this.evaluation.juryMemberId   = '21';
      this.evaluation.juryMemberName = "Test Name for jury";
      this.juryService.updateEvaluationOfProject(this.id, this.evaluation);

      this.snackBar.open('Дякуємо за Ваше оцінювання !!!','', {
        duration: 1500,
      });
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
        const tempComment = new Comment(idComment,"145","ЯкийсьЮзер", this.commentText, new Date);
        this.juryService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
      }

      isDisableCommentButton(){
        return this.commentText.length <= 0 ? true:false;
      }
}
