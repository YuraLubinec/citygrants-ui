import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-user-dialog-admin-page',
    templateUrl: './user-dialog-admin-page.component.html',
    styleUrls: ['./user-dialog-admin-page.component.css'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class UserDialogAdminPageComponent {
    private idF   :string;
    private loginF:string;
    private roleF :string;
    private userForm : FormGroup;

    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    public snackBar: MatSnackBar) {
        this.idF    = data.id;
        this.loginF = data.login;
        this.roleF  = data.role;

        this.createDescriptionForm(data);
     }

     createDescriptionForm(data :any) {
        this.userForm = this.fb.group({
          login: [data.login, [Validators.required, Validators.email, Validators.maxLength(50)]],
          password: ["****", [Validators.required]],
          fullName: [data.fullName, [Validators.required]],
          role: [data.role, [Validators.required]],
        })
      }

      submitUserForm(){
          alert("trat tatatat");
      }
    
}