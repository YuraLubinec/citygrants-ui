import { OnInit, Component, Inject, ViewEncapsulation, Directive, ViewChildren, QueryList } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";
import { Comment } from "../models/comment";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { FileInfo } from "../models/fileInfo";
import { AdminService } from "../services/admin.service";

@Component({
    selector: 'app-project-dialog-admin-page',
    templateUrl: './project-dialog-admin-page.component.html',
    styleUrls: ['./project-dialog-admin-page.component.css'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class AdminDialogPageComponent {
    private id                 :String;
    private projectDescription :Description;
    private projectBudget      :Budget;
    private evaluation         :Evaluation;
    private comments           :Array<Comment>;
    private comment            :Comment;
    private filesInfo          :Array<FileInfo>;
    private commentText        :string;
    private step               = 0;

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar) {
                  console.log(data);

        this.id                 = data.id;
        this.projectDescription = data.description;
        this.projectBudget      = data.budget;
        this.evaluation         = data.evaluation;
        this.comments           = data.comments;
        this.filesInfo          = data.filesInfo;
        this.commentText        = "";
        this.step               = 0;
    }

    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveEvaluation(){
      this.evaluation.juryMemberId = '19';
      this.adminService.updateEvaluationOfProject(this.id, this.evaluation);

      this.snackBar.open('Дякуємо за Ваше оцінювання !!!','', {
        duration: 1500,
      });
    }

    saveComment(){
        const tempComment = new Comment("145","ЯкийсьЮзер", this.commentText, new Date);
        this.adminService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
      }

      isDisableCommentButton(){
        return this.commentText.length <= 0 ? true:false;
      }
}
