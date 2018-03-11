import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Roles } from "../models/roles";
import { forEach } from "@angular/router/src/utils/collection";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { User } from "../models/user";

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

    constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    public snackBar: MatSnackBar) {
        this.idF    = data.id;
        this.loginF = data.login;
        this.roleF  = data.role;

        this.userRoles = [
          new Roles("ADMIN", "адміністратор"),
          new Roles("JURYMEMBER", "оператор")
        ];

        this.createUserForm(data);
     }

     ngOnInit(): void {
       this.currUserRole = this.roleF === "адміністратор"?"ADMIN":"JURYMEMBER";
     }
     
     createUserForm(data :any) {
        this.userForm = this.fb.group({
          login: [data.login, [Validators.required, Validators.maxLength(50)]],
          password: [data.password, [Validators.required]],
          fullName: [data.fullName, [Validators.required]],
          role: [data.role, [Validators.required]],
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
        console.log(user);

        if(user.id === undefined){
          this.adminService.createUser(user);
        }else{
        this.adminService.updateUser(user);}

        this.snackBar.open('Дані обновлено !!!','', {
          duration: 2000,
        });
      }
    
}