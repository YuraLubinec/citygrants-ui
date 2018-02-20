import { OnInit, Component, Inject, ViewEncapsulation, Directive, ViewChildren, QueryList } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Evaluation } from "../models/evaluation";
import { Description } from "../models/description";
import { Budget } from "../models/budget";
import { Comment } from "../models/comment";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { FileInfo } from "../models/fileInfo";
import { AdminService } from "../services/admin.service";
import { ProjectAdm } from "../models/projectAdm";
import { InterviewEvaluation } from "../models/interviewEvaluation";

@Component({
    selector: 'app-project-dialog-admin-page',
    templateUrl: './project-dialog-admin-page.component.html',
    styleUrls: ['./project-dialog-admin-page.component.css'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class AdminDialogPageComponent {
    private id                   :string;
    private projectDescription   :Description;
    private projectBudget        :Budget;
    private evaluations          :Array<Evaluation>;
    private interviewEvaluations :Array<InterviewEvaluation>;
    private comments             :Array<Comment>;
    private comment              :Comment;
    private filesInfo            :Array<FileInfo>;
    private commentText          :string;
    private approvedToSecondStage: boolean;
    private step                 = 0;

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar) {  
                  console.log(data)               

        this.id                    = data.id;
        this.approvedToSecondStage = data.approvedToSecondStage;                
        this.projectDescription    = data.description;
        this.projectBudget         = data.budget;
        this.evaluations           = data.evaluations;
        this.interviewEvaluations  = data.interviewEvaluations;          
        this.comments              = data.comments;
        this.filesInfo             = data.filesInfo;
        this.commentText           = "";
        this.step                  = 0;
    }

    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveProject(){
      const projectUpdate = new ProjectAdm(this.id, this.projectBudget, this.projectDescription, 
                                    true, false, this.evaluations, this.interviewEvaluations);
      
      this.adminService.updateProject(projectUpdate);

      this.snackBar.open('Дякуємо за Ваше оцінювання !!!','', {
        duration: 2000,
      });
    }

    saveComment(){
        const dateNow = new Date();
        const idComment = 'idComment' + dateNow.getFullYear() 
                                      + dateNow.getMonth() 
                                      + dateNow.getDay() 
                                      + dateNow.getHours()
                                      + dateNow.getMinutes() 
                                      + dateNow.getMilliseconds();
                                      + dateNow.getMilliseconds();

        const tempComment = new Comment(idComment,"145","ЯкийсьЮзер", this.commentText, new Date);
        this.adminService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
    }
    deleteComment(id:string, idComment:string){
      this.adminService.deleteCommentOfProject(id, idComment);

      let index = this.comments.findIndex(comment => comment.id === idComment);
      this.comments.splice(index, 1);
    }

      isDisableCommentButton(){
        return this.commentText.length <= 0 ? true:false;
      }
}
