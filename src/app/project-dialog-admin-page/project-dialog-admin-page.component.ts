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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
    private appDescForm          : FormGroup;

    private requiredMessage    = "обов'язково для заповнення"
    private defaultMessage     = "помилка введення";
    private patternMessage     = "не відповідає параметрам введення";
    private patternEmail       = "не вірний формат електронної пошти";

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar, private fb: FormBuilder) {  
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

        this.createDescriptionForm(data);
    }


    createDescriptionForm(data :any) {
      this.appDescForm = this.fb.group({
        name: [data.description.name, [Validators.required, Validators.maxLength(250),]],
        requestedBudget: [data.description.requestedBudget, [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(20)]],
        organizationName: [data.description.organizationName, [Validators.required, Validators.maxLength(250)]],
        theme: [data.description.theme, [Validators.required, Validators.maxLength(250)]],
        requiredTime: [data.description.requiredTime, [Validators.required, Validators.maxLength(100)]],
        coordinatorName: [data.description.coordinatorName, [Validators.required, Validators.maxLength(100)]],
        coordinatorPhone: [data.description.coordinatorPhone, [Validators.required, Validators.pattern("(\\d){10}")]],
        coordinatorEmail: [data.description.coordinatorEmail, [Validators.required, Validators.email, Validators.maxLength(50)]],
        projectMembers: [data.description.projectMembers, [Validators.required, Validators.maxLength(1000)]],
        expirienceDescription: [data.description.expirienceDescription, [Validators.required, Validators.maxLength(2000)]],
        address: [data.description.address, [Validators.required, Validators.maxLength(250)]],
        webaddress: [data.description.webaddress, [Validators.required, Validators.maxLength(150)]],
        goal: [data.description.goal, [Validators.required, Validators.maxLength(1000)]],
        actuality: [data.description.actuality, [Validators.required, Validators.maxLength(2000)]],
        fullDescription: [data.description.fullDescription, [Validators.required, Validators.maxLength(2000)]],
        targetGroup: [data.description.targetGroup, [Validators.required, Validators.maxLength(2000)]],
        expectedResults: [data.description.expectedResults, [Validators.required, Validators.maxLength(2000)]],
        requiredPermissions: [data.description.requiredPermissions, [Validators.required, Validators.maxLength(1000)]],
        partners: [data.description.partners, [Validators.required, Validators.maxLength(1000)]]
      })
    }

    submitDescriptionForm() {
      let field = this.appDescForm.value;
      this.projectDescription = new Description(
        field.name, field.requestedBudget, field.organizationName,
        field.coordinatorName, field.coordinatorPhone, field.coordinatorEmail,
        field.theme, field.requiredTime, field.projectMembers,
        field.expirienceDescription, field.address, field.webaddress,
        field.goal, field.actuality, field.fullDescription,
        field.targetGroup, field.expectedResults, field.requiredPermissions,
        field.partners
      );
      this.saveProject();
    }

    getErrorMessage(controlName:String){
      switch(controlName) {
        case "name": {
          return this.appDescForm.controls.name.hasError("required") ? this.requiredMessage : this.defaultMessage;
        }
        case "requestedBudget": {
          return this.appDescForm.controls.requestedBudget.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.requestedBudget.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "organizationName": {
          return this.appDescForm.controls.organizationName.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.organizationName.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "theme": {
          return this.appDescForm.controls.theme.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.theme.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "coordinatorName": {
          return this.appDescForm.controls.coordinatorName.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.coordinatorName.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "coordinatorPhone": {
          return this.appDescForm.controls.coordinatorPhone.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.coordinatorPhone.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "coordinatorEmail": {
          return this.appDescForm.controls.coordinatorEmail.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.coordinatorEmail.hasError("pattern")  ? this.patternMessage  : 
                 this.appDescForm.controls.coordinatorEmail.hasError("email")    ? this.patternEmail    : this.defaultMessage;
        }
        case "projectMembers": {
          return this.appDescForm.controls.projectMembers.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.projectMembers.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "expirienceDescription": {
          return this.appDescForm.controls.expirienceDescription.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.expirienceDescription.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "address": {
          return this.appDescForm.controls.address.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.address.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "webaddress": {
          return this.appDescForm.controls.webaddress.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.webaddress.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "goal": {
          return this.appDescForm.controls.goal.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.goal.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "actuality": {
          return this.appDescForm.controls.actuality.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.actuality.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "fullDescription": {
          return this.appDescForm.controls.fullDescription.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.fullDescription.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "targetGroup": {
          return this.appDescForm.controls.targetGroup.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.targetGroup.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "expectedResults": {
          return this.appDescForm.controls.expectedResults.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.expectedResults.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "requiredPermissions": {
          return this.appDescForm.controls.requiredPermissions.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.requiredPermissions.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "expectedResults": {
          return this.appDescForm.controls.expectedResults.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.expectedResults.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "partners": {
          return this.appDescForm.controls.partners.hasError("required") ? this.requiredMessage :
                 this.appDescForm.controls.partners.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
      }
    }


    ngAfterViewInit() {
        this.arrComments.changes.subscribe(c => {});
      }

    saveProject(){

      const projectUpdate = new ProjectAdm(this.id, this.projectBudget, this.projectDescription, 
                                    true, false, this.evaluations, this.interviewEvaluations);
      
      this.adminService.updateProject(projectUpdate);

      this.snackBar.open('Проект обновлено !!!','', {
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
