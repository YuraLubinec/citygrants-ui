import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Roles } from "../models/roles";
import { forEach } from "@angular/router/src/utils/collection";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-dialog-admin-page',
    templateUrl: './user-dialog-admin-page.component.html',
    styleUrls: ['./user-dialog-admin-page.component.css'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class UserDialogAdminPageComponent implements OnInit {

    private idF   :string;
    private loginF:string;
    private roleF :string;
    private userForm : FormGroup;
    private userRoles :Array<Roles>;
    private currUserRole:string;

    private requiredMessage    = "обов'язково для заповнення"
    private defaultMessage     = "помилка введення";
    private patternMessage     = "не відповідає параметрам введення";
    private patternEmail       = "не вірний формат електронної пошти";

    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    public snackBar: MatSnackBar) {

        this.userRoles = [
          new Roles("ADMIN", "адміністратор"),
          new Roles("JURYMEMBER", "оператор")
        ];

        this.createUserForm(data);
     }

     ngOnInit(): void {
       this.currUserRole = this.data.role === "адміністратор"?"адміністратор":"оператор";
     }
     
     createUserForm(data :any) {
        this.userForm = this.fb.group({
          login   : [data.login, [Validators.required, Validators.maxLength(50)]],
          password: [data.password, [Validators.required]],
          fullName: [data.fullName, [Validators.required]],
          role    : [data.role, [Validators.required]],
        })
      }

      submitUserForm(){
        let field = this.userForm.value;

        let user      = new User();
        user.id       = this.data.id;
        user.login    = field.login;
        user.password = field.password;
        user.fullName = field.fullName;
        user.role     = field.role;

        
        this.createOrUpdateUser(user);

        this.snackBar.open('Дані обновлено !!!','', {
          duration: 2000,
        });
    
      }

      private createOrUpdateUser(user:User){
        if(user.id === undefined){
          this.adminService.createUser(user);
          window.location.reload();
        }else {
          this.adminService.updateUser(user);
        }
      }

      private getErrorMessage(controlName:String){
        switch(controlName) {
          case "login": {
            return this.userForm.controls.login.hasError("required") ? this.requiredMessage : this.defaultMessage;
          }
          case "fullName": {
            return this.userForm.controls.fullName.hasError("required") ? this.requiredMessage : this.defaultMessage;
          }
          case "password": {
            return this.userForm.controls.password.hasError("required") ? this.requiredMessage : this.defaultMessage;
          }
          case "role": {
            return this.userForm.controls.role.hasError("required") ? this.requiredMessage : this.defaultMessage;
          }
        }
      }
}