import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../services/client.service';
import { ProjectApplication } from '../models/projectApplication';
import { Description } from '../models/description';
import { Budget } from '../models/budget';
import { CostItem } from '../models/costItem';
import { CostItemCategory } from '../models/costItemCategory';
import { BudgetCalculations } from '../models/budgetCalculations'

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
  // private displayBudget: boolean;
  private costItemCategories: Array<CostItemCategory>;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.displayDescriptionForm = true;
    this.displayDescription = false;
    this.displayCostItemForm = false;
    this.costItemCategories = [
      new CostItemCategory("FEE", "Гонорари, трудові угоди"), new CostItemCategory("TRANSPORT", "Транспортні витрати"),
      new CostItemCategory("NUTRITION", "Харчування"), new CostItemCategory("RENT", "Оренда"),
      new CostItemCategory("ADMINISTRATIVE", "Адміністративні витрати"), new CostItemCategory("ADVERTISING", "Публікації, реклама, PR"),
      new CostItemCategory("MATERIALS", "Придбання (купівля витратних матеріалів, тощо)"), new CostItemCategory("OTHER", "Інші витрати")
    ];
    this.budget = new Budget(new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(),
      new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>());
  }

  ngOnInit() {
    this.createEmptyDescriptionForm();
    this.createEmptyCostItemForm();
  }

  createEmptyCostItemForm() {
    this.appCostItem = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("(\\S)+(.)+")]],
      cost: ['', [Validators.required, Validators.maxLength(5), Validators.pattern("(\\S)+(.)+")]],
      count: ['', [Validators.required, Validators.maxLength(5), Validators.pattern("(\\S)+(.)+")]],
      consumptionsFromProgram: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(5)]],
      consumptionsFromOtherSources: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(7)]],
      category: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  createEmptyDescriptionForm() {
    this.appDescForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("(\\S)+(.)+")]],
      requestedBudget: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(20)]],
      organizationName: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("(\\S)+(.)+")]],
      theme: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("(\\S)+(.)+")]],
      requiredTime: ['', [Validators.required, Validators.maxLength(100), Validators.pattern("(\\S)+(.)+")]],
      coordinatorName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern("(\\S)+(.)+")]],
      coordinatorPhone: ['', [Validators.required, Validators.pattern("(\\+?38)?([0-9]{10})")]],
      coordinatorEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      projectMembers: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern("(\\S)+(.)+")]],
      expirienceDescription: ['', [Validators.required, Validators.maxLength(2000), Validators.pattern("(\\S)+(.)+")]],
      address: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("(\\S)+(.)+")]],
      webaddress: ['', [Validators.required, Validators.maxLength(150), Validators.pattern("(\\S)+(.)+")]],
      goal: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern("(\\S)+(.)+")]],
      actuality: ['', [Validators.required, Validators.maxLength(2000), Validators.pattern("(\\S)+(.)+")]],
      fullDescription: ['', [Validators.required, Validators.maxLength(2000), Validators.pattern("(\\S)+(.)+")]],
      targetGroup: ['', [Validators.required, Validators.maxLength(2000), Validators.pattern("(\\S)+(.)+")]],
      expectedResults: ['', [Validators.required, Validators.maxLength(2000), Validators.pattern("(\\S)+(.)+")]],
      requiredPermissions: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern("(\\S)+(.)+")]],
      partners: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern("(\\S)+(.)+")]]
    })
  }

  submitDescriptionForm() {
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
    this.appDescForm.reset();
    this.displayDescriptionForm = false;
    this.displayDescription = true;
    this.displayCostItemForm = true;
  }

  submitCostItemForm() {

    let field = this.appCostItem.value;
    this.addCostItemByCategory(field);
    this.appCostItem.reset();
    this.calculations = this.clientService.calculateBudget(this.budget);
    // if (!this.displayBudget) {
    //   this.displayBudget = true;
    // }

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

  confirmProjectApplication() {
    
    this.projectApplication = new ProjectApplication(this.budget, this.description, true);
    console.log(this.projectApplication);
    this.clientService.saveApplication(this.projectApplication).then(data => console.log(data));
    console.log("and here")

  }

  sentApplicationToReview() {
   
    this.projectApplication = new ProjectApplication(this.budget, this.description, false);
    console.log(this.projectApplication);
  }
}
