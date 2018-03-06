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
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { CostItemCategory } from "../models/costItemCategory";
import { BudgetCalculations } from "../models/budgetCalculations";
import { CostItem } from "../models/costItem";
import { LOGIN } from "../constants/projectConstants";

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
    private costItemCategories   : Array<CostItemCategory>;
    private appDescForm          : FormGroup;
    private appCostItem          : FormGroup;
    private calculations         : BudgetCalculations;
    private totalEvalFirstStage  : Number;

    private requiredMessage    = "обов'язково для заповнення"
    private defaultMessage     = "помилка введення";
    private patternMessage     = "не відповідає параметрам введення";
    private patternEmail       = "не вірний формат електронної пошти";

    @ViewChildren('allArrComments') arrComments: QueryList<any>;
    
    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any,
                public snackBar: MatSnackBar, private fb: FormBuilder) {          

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

        this.costItemCategories = [
          new CostItemCategory("FEE", "Гонорари, трудові угоди"),
          new CostItemCategory("TRANSPORT", "Транспортні витрати"),
          new CostItemCategory("NUTRITION", "Харчування"),
          new CostItemCategory("RENT", "Оренда"),
          new CostItemCategory("ADMINISTRATIVE", "Адміністративні витрати"),
          new CostItemCategory("ADVERTISING", "Публікації, реклама, PR"),
          new CostItemCategory("MATERIALS", "Придбання (купівля витратних матеріалів, тощо)"),
          new CostItemCategory("OTHER", "Інші витрати")
        ];

        this.calculations = this.adminService.calculateBudget(this.projectBudget);
        this.createDescriptionForm(data);
        this.createEmptyCostItemForm();
    }

    createEmptyCostItemForm() {
      this.appCostItem = this.fb.group({
        description: ['', [Validators.required, Validators.maxLength(250)]],
        cost: ['', [Validators.required, Validators.maxLength(5)]],
        count: ['', [Validators.required, Validators.maxLength(5)]],
        consumptionsFromProgram: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(5)]],
        consumptionsFromOtherSources: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(7)]],
        category: ['', [Validators.required, Validators.maxLength(50)]]
      })
    }

    submitCostItemForm(formDirective: FormGroupDirective) {
      let field = this.appCostItem.value;
      this.addCostItemByCategory(field);
      this.calculations = this.adminService.calculateBudget(this.projectBudget);
      formDirective.resetForm();
      this.appCostItem.reset();
    }
  
    private addCostItemByCategory(field: any) {
      switch (field.category) {
        case this.costItemCategories[0].value: {
          this.projectBudget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[1].value: {
          this.projectBudget.costItemsTransport.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break
        }
        case this.costItemCategories[2].value: {
          this.projectBudget.costItemsNutrition.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[3].value: {
          this.projectBudget.costItemsRent.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[4].value: {
          this.projectBudget.costItemsAdministrative.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[5].value: {
          this.projectBudget.costItemsAdvertising.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[6].value: {
          this.projectBudget.costItemsMaterial.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        case this.costItemCategories[7].value: {
          this.projectBudget.costItemsOthers.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
        default: {
          this.projectBudget.costItemsOthers.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;
        }
      }
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

    getErrorMessageCostForm(controlName:String){
      switch(controlName) {
        case "description": {
          return this.appCostItem.controls.description.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.description.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "cost": {
          return this.appCostItem.controls.cost.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.cost.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "count": {
          return this.appCostItem.controls.count.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.count.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "consumptionsFromProgram": {
          return this.appCostItem.controls.consumptionsFromProgram.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.consumptionsFromProgram.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "consumptionsFromOtherSources": {
          return this.appCostItem.controls.consumptionsFromOtherSources.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.consumptionsFromOtherSources.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
        }
        case "category": {
          return this.appCostItem.controls.category.hasError("required") ? this.requiredMessage : 
                 this.appCostItem.controls.category.hasError("pattern")  ? this.patternMessage  : this.defaultMessage;
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

      document.getElementById("totalEvalFs").innerText = String(this.getTotalEvalFirstStage(this.evaluations));
      document.getElementById("totalEvalSs").innerText = String(this.getTotalEvalSecondStage(this.interviewEvaluations));

      this.snackBar.open('Проект обновлено !!!','', {
        duration: 2000,
      });
    }

    
    getTotalEvalFirstStage(evaluations:Array<Evaluation>){
      let currentTotal= 0;
      evaluations.forEach(element => {
        currentTotal += Number(element.evalActual);
        currentTotal += Number(element.evalAttracting);
        currentTotal += Number(element.evalCompetence);
        currentTotal += Number(element.evalEfficiency);
        currentTotal += Number(element.evalInnovation);
        currentTotal += Number(element.evalIntelligibility);
        currentTotal += Number(element.evalParticipation);
        currentTotal += Number(element.evalStability);
      });

      return currentTotal;
      
    }

    getTotalEvalSecondStage(evaluations:Array<InterviewEvaluation>){
      let currentTotal= 0;
      evaluations.forEach(element => {
        currentTotal += Number(element.evaluation);
      });

      return currentTotal;
      
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

        const tempComment = new Comment(idComment,"", localStorage.getItem(LOGIN), this.commentText, new Date);
        this.adminService.saveCommentOfProject(this.id, tempComment);
        this.comments.push(tempComment);
        this.commentText = "";
    }
    deleteComment(id:string, idComment:string){
      this.adminService.deleteCommentOfProject(id, idComment);

      let index = this.comments.findIndex(comment => comment.id === idComment);
      this.comments.splice(index, 1);
    }

    removeCostItem(i: number, value: string) {
      switch (value) {
        case this.costItemCategories[0].value: {
          this.projectBudget.costItemsFee.splice(i, 1);
          break;
        }
        case this.costItemCategories[1].value: {
          this.projectBudget.costItemsTransport.splice(i, 1);
          break
        }
        case this.costItemCategories[2].value: {
          this.projectBudget.costItemsNutrition.splice(i, 1);
          break;
        }
        case this.costItemCategories[3].value: {
          this.projectBudget.costItemsRent.splice(i, 1);
          break;
        }
        case this.costItemCategories[4].value: {
          this.projectBudget.costItemsAdministrative.splice(i, 1);
          break;
        }
        case this.costItemCategories[5].value: {
          this.projectBudget.costItemsAdvertising.splice(i, 1);
          break;
        }
        case this.costItemCategories[6].value: {
          this.projectBudget.costItemsMaterial.splice(i, 1);
          break;
        }
        case this.costItemCategories[7].value: {
          this.projectBudget.costItemsOthers.splice(i, 1);
          break;
        }
        default: {
          break;
        }
      }
      this.calculations = this.adminService.calculateBudget(this.projectBudget);
    }

    isDisableCommentButton(){
      return this.commentText.length <= 0 ? true:false;
    }
}
