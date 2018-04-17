import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { ClientService } from '../services/client.service';
import { ProjectApplication } from '../models/projectApplication';
import { Description } from '../models/description';
import { Budget } from '../models/budget';
import { CostItem } from '../models/costItem';
import { CostItemCategory } from '../models/costItemCategory';
import { BudgetCalculations } from '../models/budgetCalculations'
import { Evaluation } from '../models/evaluation';
import { MatTableDataSource, MatSnackBar, MatStepper } from '@angular/material';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  providers: [ClientService]
})
export class ClientPageComponent implements OnInit {

  private appDescForm: FormGroup;
  private appCostItem: FormGroup;
  private projectApplication: ProjectApplication;
  private budget: Budget;
  private calculations: BudgetCalculations;
  private description: Description;
  private displayDescriptionForm: boolean;
  private displayCostItemForm: boolean;
  private displayDescription: boolean;
  private costItemCategories: Array<CostItemCategory>;
  private images: Array<File>;
  private pdfDocs: Array<File>;
  private requiredMessage    = "обов'язково для заповнення"
  private defaultMessage     = "помилка введення";
  private patternMessage     = "не відповідає параметрам введення";
  private patternEmail       = "не вірний формат електронної пошти"
  private positionTollTip    = "above";
  private notUniqNameMessage :string;
  private isSavedValidDescForm  = false;

  constructor(private clientService: ClientService, private fb: FormBuilder, public snackBar: MatSnackBar) {
    this.displayDescriptionForm = true;
    this.displayDescription = false;
    this.displayCostItemForm = false;
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
    this.budget = new Budget(new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(),
      new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>());
    this.images = new Array<File>();
    this.pdfDocs = new Array<File>();
  }

  ngOnInit() {
    this.createEmptyDescriptionForm();
    this.createEmptyCostItemForm();
  }

  createEmptyCostItemForm() {
    this.appCostItem = this.fb.group({
      description:                  [''],
      cost:                         [''],
      count:                        [''],
      consumptionsFromProgram:      [''],
      consumptionsFromOtherSources: [''],
      category:                     ['']
    })
  }

  createEmptyDescriptionForm() {
    this.appDescForm = this.fb.group({
      name:                   [''],
      requestedBudget:        [''],
      organizationName:       [''],
      theme:                  [''],
      requiredTime:           [''],
      coordinatorName:        [''],
      coordinatorPhone:       [''],
      coordinatorEmail:       [''],
      projectMembers:         [''],
      expirienceDescription:  [''],
      address:                [''],
      webaddress:             [''],
      goal:                   [''],
      actuality:              [''],
      fullDescription:        [''],
      targetGroup:            [''],
      expectedResults:        [''],
      requiredPermissions:    [''],
      partners:               ['']
    });
  }

  submitDescriptionForm(stepper: MatStepper) {
    let field = this.appDescForm.value;
    this.description = new Description(
      field.name, field.requestedBudget, field.organizationName,
      field.coordinatorName, field.coordinatorPhone, field.coordinatorEmail,
      field.theme, field.requiredTime, field.projectMembers,
      field.expirienceDescription, field.address, field.webaddress,
      field.goal, field.actuality, field.fullDescription,
      field.targetGroup, field.expectedResults, field.requiredPermissions,
      field.partners
    );
    this.validDescriptionForm();
    this.checkIsNotUniqNameProject(field.name, stepper);
    if(!this.appDescForm.valid){
      this.callSnackBarMessage("Помилка введення даних !!!");
    }
  }

  submitCostItemForm() {
    this.validCostItemForm();

    if(this.appCostItem.valid){
      let field = this.appCostItem.value;
      this.addCostItemByCategory(field);
      this.calculations = this.clientService.calculateBudget(this.budget);

      this.createEmptyCostItemForm();
    }
  }

  confirmProjectApplication(stepper: MatStepper) {
    let moveToDescription = 0;
    let moveToBudjet      = 1;

    if(!this.description && !this.appDescForm.dirty){
      stepper.selectedIndex = moveToDescription;
      this.callSnackBarMessage("Ви не заповнили форму!");
    }else if(!this.appDescForm.valid){
      stepper.selectedIndex = moveToDescription;
      this.callSnackBarMessage("Не вірно заповнена форма!");
    }else if(!this.isSavedValidDescForm ||!this.description && this.appDescForm.dirty){
      stepper.selectedIndex = moveToDescription;
      this.callSnackBarMessage("Збережіть форму!");
    }else if(!this.calculations || !this.appCostItem.valid || this.calculations.totalFromProgram == 0 ){
      stepper.selectedIndex = moveToBudjet;
      this.callSnackBarMessage("Не вірно заповнені дані по кошторису !");
    }else{
      this.submitDescriptionForm(stepper);
      this.projectApplication = new ProjectApplication(this.budget, this.description, true);
      this.clientService.saveApplication(this.projectApplication)
        .then(data => {
          this.uploadAttachments(data.id);
          this.projectApplication  = null;
          this.calculations        = null;
  
          this.budget = new Budget(new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(),
            new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>());
            this.createEmptyDescriptionForm();
            stepper.selectedIndex = moveToDescription;
            this.callSnackBarMessage("Заявку прийнято !!!");

            this.appDescForm.controls['name'].setErrors({'notUniqName': false});
            this.createEmptyCostItemForm();
  
        }).catch(err => this.handlePromiseError(err));
    }
  }

  goForward(stepper: MatStepper, form:FormGroup){
    this.appDescForm.valid ? stepper.next():'doNothing';
  }

  
  private checkIsNotUniqNameProject(name:string, stepper: MatStepper){
    if(name){
      this.clientService.isUniqNameProject(name).subscribe(
        response => {
          if(!response){
            this.appDescForm.controls['name'].setErrors({'notUniqName': !response});
            this.notUniqNameMessage    = "Така назва вже існує";
            this.isSavedValidDescForm = response;
          }else{
            this.goForward(stepper, this.appDescForm);
          }    
        },
         error => this.handlePromiseError(error))};
  }

  private validDescriptionForm(){
    let field = this.appDescForm.value;

    this.appDescForm = this.fb.group({
      name:                   [field.name, [Validators.required, Validators.maxLength(250),]],
      requestedBudget:        [field.requestedBudget, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.maxLength(6)]],
      organizationName:       [field.organizationName, [Validators.required, Validators.maxLength(250)]],
      theme:                  [field.theme, [Validators.required, Validators.maxLength(250)]],
      requiredTime:           [field.requiredTime, [Validators.required, Validators.maxLength(100)]],
      coordinatorName:        [field.coordinatorName, [Validators.required, Validators.maxLength(100)]],
      coordinatorPhone:       [field.coordinatorPhone, [Validators.required, Validators.pattern("(\\d){10}")]],
      coordinatorEmail:       [field.coordinatorEmail, [Validators.required, Validators.email, Validators.maxLength(50)]],
      projectMembers:         [field.projectMembers, [Validators.required, Validators.maxLength(1000)]],
      expirienceDescription:  [field.expirienceDescription, [Validators.required, Validators.maxLength(2000)]],
      address:                [field.address, [Validators.required, Validators.maxLength(250)]],
      webaddress:             [field.webaddress, [Validators.required, Validators.maxLength(150)]],
      goal:                   [field.goal, [Validators.required, Validators.maxLength(1000)]],
      actuality:              [field.actuality, [Validators.required, Validators.maxLength(2000)]],
      fullDescription:        [field.fullDescription, [Validators.required, Validators.maxLength(2000)]],
      targetGroup:            [field.targetGroup, [Validators.required, Validators.maxLength(2000)]],
      expectedResults:        [field.expectedResults, [Validators.required, Validators.maxLength(2000)]],
      requiredPermissions:    [field.requiredPermissions, [Validators.required, Validators.maxLength(1000)]],
      partners:               [field.partners, [Validators.required, Validators.maxLength(1000)]]
    });
    this.appDescForm.markAsTouched();  
    this.isSavedValidDescForm = this.appDescForm.valid;
  }

  private validCostItemForm() {
    let field = this.appCostItem.value;

    this.appCostItem = this.fb.group({
      description: [field.description, [Validators.required, Validators.maxLength(250)]],
      cost: [field.cost, [Validators.required, Validators.maxLength(5)]],
      count: [field.count, [Validators.required, Validators.maxLength(5)]],
      consumptionsFromProgram: [field.consumptionsFromProgram, [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(5)]],
      consumptionsFromOtherSources: [field.consumptionsFromOtherSources, [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(6)]],
      category: [field.category, [Validators.required, Validators.maxLength(50)]]
    });

    this.appCostItem.markAsTouched();  
  }

  private addCostItemByCategory(field: any) {
    switch (field.category) {
      case this.costItemCategories[0].value: {
        this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[1].value: {
        this.budget.costItemsTransport.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break
      }
      case this.costItemCategories[2].value: {
        this.budget.costItemsNutrition.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[3].value: {
        this.budget.costItemsRent.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[4].value: {
        this.budget.costItemsAdministrative.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[5].value: {
        this.budget.costItemsAdvertising.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[6].value: {
        this.budget.costItemsMaterial.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      case this.costItemCategories[7].value: {
        this.budget.costItemsOthers.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
      default: {
        this.budget.costItemsOthers.push(new CostItem(field.description, field.cost, field.count,
          parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
        break;
      }
    }
  }

  checkIfNotEmpty(arr: Array<CostItem>): boolean {
    return arr.length != 0;
  }

  removeCostItem(i: number, value: string) {
    switch (value) {
      case this.costItemCategories[0].value: {
        this.budget.costItemsFee.splice(i, 1);
        break;
      }
      case this.costItemCategories[1].value: {
        this.budget.costItemsTransport.splice(i, 1);
        break
      }
      case this.costItemCategories[2].value: {
        this.budget.costItemsNutrition.splice(i, 1);
        break;
      }
      case this.costItemCategories[3].value: {
        this.budget.costItemsRent.splice(i, 1);
        break;
      }
      case this.costItemCategories[4].value: {
        this.budget.costItemsAdministrative.splice(i, 1);
        break;
      }
      case this.costItemCategories[5].value: {
        this.budget.costItemsAdvertising.splice(i, 1);
        break;
      }
      case this.costItemCategories[6].value: {
        this.budget.costItemsMaterial.splice(i, 1);
        break;
      }
      case this.costItemCategories[7].value: {
        this.budget.costItemsOthers.splice(i, 1);
        break;
      }
      default: {
        break;
      }
    }
    this.calculations = this.clientService.calculateBudget(this.budget);
  }

  private uploadAttachments(id: string): void {
    if (this.images.length > 0 || this.pdfDocs.length > 0) {
      this.clientService.uploadFiles(id, this.images, this.pdfDocs).subscribe(data => {
        this.images = new Array<File>();
        this.pdfDocs = new Array<File>();
      }, err => alert(err.status)
      )
    }
  }

  callSnackBarMessage(message : string){
    this.snackBar.open(message,'', {
      duration: 2000,
    });
  }

  saveImagesToUpload(event) {
    this.images = new Array<File>();
    for (let image of event.target.files) {
      if (this.images.length > 4) {
        alert('Дозволено завантаужвати не більше 5 фотографій');
        break;
      }
      if (image.size <= 10240000) {
        this.images.push(image);
      } else {
        alert('Розмір фотографії не повинен перервищувати 10мб, спробуйте ще раз');
      }
    }
  }

  savePdfToUpload(event) {
    this.pdfDocs = new Array<File>();
    for (let pdf of event.target.files) {
      if (this.pdfDocs.length > 4) {
        alert('Дозволено завантаужвати не більше 5 документів');
        break;
      }
      if (pdf.size <= 10240000) {
        this.pdfDocs.push(pdf);
      } else {
        alert('Розмір документу не повинен перервищувати 10мб, спробуйте ще раз');
      }
    }
  }


  sentApplicationToReview() {
    this.projectApplication = new ProjectApplication(this.budget, this.description, false);
  }

  private handlePromiseError(err): void {
    err.status == '400' ? this.checkErrorGetMessage(err): alert('Щось пішло не так, повторіть спробу пізніше : ' + err.status);
  }

  private checkErrorGetMessage(err:any){
    if(err.status == '400'){
      this.notUniqNameMessage = err.error.message;
      this.appDescForm.controls['name'].setErrors({'notUniqName': true});

      alert("Виникла помилка введення даних!!!");
    }
  }

  getErrorMessage(controlName:String){
    switch(controlName) {
      case "name": {
        return this.appDescForm.controls.name.hasError("required")    ? this.requiredMessage:
               this.appDescForm.controls.name.hasError("notUniqName") ? this.notUniqNameMessage: this.defaultMessage;
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
      case "requiredTime": {
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
        return this.appCostItem.controls.category.hasError("required") ? this.requiredMessage : this.defaultMessage;
      }
    }
  }
}
