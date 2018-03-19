import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Roles } from "../models/roles";
import { forEach } from "@angular/router/src/utils/collection";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dialog-admin-user-page',
    templateUrl: './dialog-admin-user-page.component.html',
    styleUrls: ['./dialog-admin-user-page.component.css'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
  })

export class DialogAdminUserPageComponent implements OnInit {

    private userForm            : FormGroup;
    private userRoles           : Array<Roles>;
    private currUserRole        : string;
    private notUniqEmailMessage : string;

    private requiredMessage    = "обов'язково для заповнення"
    private defaultMessage     = "помилка введення";
    private patternMessage     = "не відповідає параметрам введення";
    private patternEmail       = "не вірний формат електронної пошти";

    constructor(private adminService: AdminService, public dialogUser: MatDialogRef<DialogAdminUserPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private router:Router,
    public snackBar: MatSnackBar) {

      this.userRoles = [
        new Roles("ADMIN", "адміністратор"),
        new Roles("JURYMEMBER", "член жюрі")
      ];

      this.createUserForm(data);
     }

     ngOnInit(): void {
       this.currUserRole = this.data.role == this.userRoles[0].name ? this.userRoles[0].value : this.userRoles[1].value;
     }
     
     createUserForm(data :any) {
        
      if(data.id === undefined){
        this.userForm = this.fb.group({
          login   : [data.login, [Validators.required, Validators.maxLength(50)]],
          password: [data.password,[Validators.required]],
          fullName: [data.fullName, [Validators.required]],
          role    : [data.role, [Validators.required]],
        })
      }else{
        this.userForm = this.fb.group({
          login   : [data.login, [Validators.required, Validators.maxLength(50)]],
          password: [''],
          fullName: [data.fullName, [Validators.required]],
          role    : [data.role, [Validators.required]],
        })
      }
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
      }

      private createOrUpdateUser(user:User){
        if(user.id === undefined){
        this.adminService.createUser(user).subscribe(
          response => {
            this.callSnackBarMessage("Користувач створений");

            user.id   = response.id;
            user.role = response.role == this.userRoles[0].value ? this.userRoles[0].name : this.userRoles[1].name;

            this.dialogUser.close(user);
          },
           error => this.handlePromiseError(error));
        }else{
          this.adminService.updateUser(user).subscribe(
            response => {
              user.role = user.role == this.userRoles[0].value ? this.userRoles[0].name : this.userRoles[1].name;
              this.dialogUser.close(user);
              this.callSnackBarMessage("Дані користувача оновлені");
            },
             error => this.handlePromiseError(error));
        }
      }

      callSnackBarMessage(message:string){
        this.snackBar.open(message,'', {
          duration: 2000,
        });
      }

      private handlePromiseError(err): void {
        
        err.status == '400' ? this.checkErrorGetMessage(err): alert('Щось пішло не так, повторіть спробу пізніше : ' + err.status);
      }
    
      private checkErrorGetMessage(err:any){
        if(err.status == '400'){
          this.notUniqEmailMessage = err.error.message;
          this.userForm.controls['login'].setErrors({'notUniqEmail': true});
        }
      }

      private getErrorMessage(controlName:String){
        switch(controlName) {
          case "login": {
            return this.userForm.controls.login.hasError("required") ? this.requiredMessage 
            : this.userForm.controls.login.hasError("notUniqEmail")?this.notUniqEmailMessage:this.defaultMessage
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