import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../services/client.service';
import { ProjectApplication } from '../models/projectApplication';
import { Description } from '../models/description';
import { Budget } from '../models/budget';
import { CostItem } from '../models/costItem';
import { CostItemCategory } from '../models/costItemCategory';

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
  private costItem: Cos
  private description: Description;
  private displayDescriptionForm: boolean = true;
  private displayDescription: boolean = false;
  private displayCostItemForm: boolean = false;
  private costItemCategorys: Array<CostItemCategory> = [];

  constructor(private clientService: ClientService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createEmptyDescriptionForm();
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

  createEmptyDescriptionForm() {
    this.appDescForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      requestedBudget: ['', [Validators.required, Validators.pattern("(\\d)+"), Validators.maxLength(20)]],
      organizationName: ['', [Validators.required, Validators.maxLength(250)]],
      theme: ['', [Validators.required, Validators.maxLength(250)]],
      requiredTime: ['', [Validators.required, Validators.maxLength(100)]],
      coordinatorName: ['', [Validators.required, Validators.maxLength(100)]],
      coordinatorPhone: ['', [Validators.required, Validators.pattern("(\\+?38)?([0-9]{10})")]],
      coordinatorEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      projectMembers: ['', [Validators.required, Validators.maxLength(1000)]],
      expirienceDescription: ['', [Validators.required, Validators.maxLength(2000)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      webaddress: ['', [Validators.required, Validators.maxLength(150)]],
      goal: ['', [Validators.required, Validators.maxLength(1000)]],
      actuality: ['', [Validators.required, Validators.maxLength(2000)]],
      fullDescription: ['', [Validators.required, Validators.maxLength(2000)]],
      targetGroup: ['', [Validators.required, Validators.maxLength(2000)]],
      expectedResults: ['', [Validators.required, Validators.maxLength(2000)]],
      requiredPermissions: ['', [Validators.required, Validators.maxLength(1000)]],
      partners: ['', [Validators.required, Validators.maxLength(1000)]]
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

    let field = this.appDescForm.value;
    this.budget = new Budget(new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(),
      new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>(), new Array<CostItem>());
      switch (field.category) {
        case this.costItemCategorys[0].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));
          break;

        }
        case this.costItemCategorys[1].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[2].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[3].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[4].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[5].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[6].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        case this.costItemCategorys[7].value : {
          this.budget.costItemsFee.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break;

        }
        default: { 
          this.budget.costItems.push(new CostItem(field.description, field.cost, field.count,
            parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources)));

          break; 
       } 
      }

      
    new CostItem(field.description, field.cost, field.count,
      parseInt(field.consumptionsFromProgram), parseInt(field.consumptionsFromOtherSources));

  }
}
