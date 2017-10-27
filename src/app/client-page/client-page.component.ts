import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../services/client.service';
import { ProjectApplication } from '../models/projectApplication';
import { Description } from '../models/description';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  providers: [ClientService]
})
export class ClientPageComponent implements OnInit {

  private appDescForm: FormGroup;
  private description: Description;
  private displayForm: boolean = true;
  private displayDescription: boolean = false;

  constructor(private clientService: ClientService, private fb: FormBuilder) {


  }

  ngOnInit() {
    this.createEmptyForm();
  }

  createEmptyForm() {
    this.appDescForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      requestedBudget: ['', [Validators.required, Validators.pattern("(\\d)+"),Validators.maxLength(20)]],
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
    this.displayForm = false;
    this.displayDescription = true;
  }
}
