import { OnInit, Component, Inject, ViewEncapsulation, Directive, ViewChildren, QueryList } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";
import { JuryService } from "../services/jury.service";
import { Comment } from "../models/comment";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: 'app-project-dialog-page',
    templateUrl: './project-dialog-page.component.html',
    styleUrls: ['./project-dialog-page.component.css'],
    providers: [JuryService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class JuryDialogPageComponent {
    [x: string]: any;
    private id                 :String;
    private projectDescription :Description;
    private projectBudget      :Budget;
    private evaluation         :Evaluation;
    private comments           :Array<Comment>;
    private comment            :Comment;
    private commentText        :string;
    private step               = 0;

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private juryService: JuryService, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.id                 = data.id;
        this.projectDescription = data.description;
        this.projectBudget      = data.budget;
        this.evaluation         = data.evaluation;
        this.comments           = data.comments;
        this.commentText        = "";
        this.step               = 0;

        console.log(data);
    }

    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveEvaluation(){
      this.evaluation.juryMemberId = '19';
      this.juryService.updateEvaluationOfProject(this.id, this.evaluation);
    }

    saveComment(){
        const tempComment = new Comment("145","ЯкийсьЮзер", this.commentText);
        this.juryService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
      }
}