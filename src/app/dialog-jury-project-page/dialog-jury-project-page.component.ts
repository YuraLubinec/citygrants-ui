import {Component, Inject, ViewEncapsulation, ViewChildren, QueryList} from "@angular/core";
import {MAT_DIALOG_DATA, MatSnackBar, MatDialogRef} from "@angular/material";
import {Evaluation} from "../models/evaluation";
import {Description} from "../models/description";
import {Budget} from "../models/budget";
import {JuryService} from "../services/jury.service";
import {Comment} from "../models/comment";
import {FileInfo} from "../models/fileInfo";
import {BudgetCalculations} from "../models/budgetCalculations";
import {InterviewEvaluation} from "../models/interviewEvaluation";
import {User} from "../models/user";
import {LOGIN, BASEURL} from "../constants/projectConstants";

@Component({
  selector: 'app-dialog-jury-project-page',
  templateUrl: './dialog-jury-project-page.component.html',
  styleUrls: ['./dialog-jury-project-page.component.css'],
  providers: [JuryService],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})

export class DialogJuryProjectPageComponent {
  public id: String;
  public projectDescription: Description;
  public projectBudget: Budget;
  public evaluation: Evaluation;
  public comments: Array<Comment>;
  public comment: Comment;
  public filesInfo: Array<FileInfo>;
  public commentText: string;
  public step = 0;
  public calculations: BudgetCalculations;
  public approvedToSecondStage: boolean;
  public interviewEvaluation: InterviewEvaluation;
  public basUrl = BASEURL;
  public currentUser: User;

  @ViewChildren('allArrComments') arrComments: QueryList<any>;

  constructor(public juryService: JuryService, @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar, public dialogProject: MatDialogRef<DialogJuryProjectPageComponent>,) {
    this.id = data.id;
    this.projectDescription = data.description;
    this.projectBudget = data.budget;
    this.evaluation = data.evaluation;
    this.comments = data.comments;
    this.filesInfo = data.filesInfo;
    this.commentText = "";
    this.step = 0;
    this.approvedToSecondStage = data.approvedToSecondStage;
    this.interviewEvaluation = data.interviewEvaluation;
    this.calculations = this.juryService.calculateBudget(this.projectBudget);

    this.juryService.getUserByLogin(localStorage.getItem(LOGIN)).subscribe(user => {
      this.currentUser = user;
    })
  }

  ngAfterViewInit() {
    this.arrComments.changes.subscribe(c => {
    });
  }

  saveEvaluation() {
    this.evaluation.juryMemberLogin = localStorage.getItem(LOGIN);
    this.evaluation.juryMemberFullName = this.currentUser.fullName;
    this.juryService.updateEvaluationOfProject(this.id, this.evaluation);

    this.snackBar.open('Дякуємо за Ваше оцінювання !!!', '', {
      duration: 1500,
    });

    this.dialogProject.close();
  }

  saveInterviewEvaluation() {
    this.interviewEvaluation.juryMemberName = this.currentUser.fullName;

    this.juryService.updateInterviewEvaluationOfProject(this.id, this.interviewEvaluation);

    this.snackBar.open('Дякуємо за Ваше оцінювання !!!', '', {
      duration: 1500,
    });

    this.dialogProject.close();
  }

  saveComment() {
    const dateNow = new Date();
    const idComment = 'idComment' + dateNow.getFullYear()
      + dateNow.getMonth()
      + dateNow.getDay()
      + dateNow.getHours()
      + dateNow.getMinutes()
      + dateNow.getSeconds()
      + dateNow.getMilliseconds();
    const tempComment = new Comment(idComment, "", localStorage.getItem(LOGIN), this.commentText, new Date);
    this.juryService.saveCommentOfProject(this.id, tempComment);
    tempComment.userName = this.currentUser.fullName;
    this.comments.push(tempComment);
    this.commentText = "";
  }

  isDisableCommentButton() {
    return this.commentText.length <= 0;
  }

  getFileInfo(idFile: string) {
    this.juryService.getFileInfo(idFile);
  }

}
