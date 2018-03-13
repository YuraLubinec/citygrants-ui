import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { MatPaginator, PageEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ProjectAdm } from '../models/projectAdm';
import {SelectionModel} from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';
import { AdminDialogPageComponent } from '../project-dialog-admin-page/project-dialog-admin-page.component';
import { User } from '../models/user';
import { UserDialogAdminPageComponent } from '../user-dialog-admin-page/user-dialog-admin-page.component';
import { Roles } from '../models/roles';


@Component({
    selector: 'app-manag-user-page',
    templateUrl: './manag-user-page.component.html',
    styleUrls: ['./manag-user-page.component.css'],
    providers: [AdminService]
  })

export class ManageUserPageComponent implements OnInit {
    private users      : Array<User>;
    private dataSource : any;
    private length     : Number;
    private pageSize   : Number;
    private pageEvent  : PageEvent;
    private pageSizeOptions  = [5, 10, 25, 50];
    private displayedColumns = ['login', 'fullName', 'role','buttons'];
    private selection  : SelectionModel<User>;
    private positionTollTip = "above";
    private userRoles: Array<Roles>;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor(private adminService: AdminService, public dialog:MatDialog) {
      this.adminService.getAllUsers().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
      this.selection = new SelectionModel<User>(true, []);
      
      this.userRoles = [
        new Roles("ADMIN", "адміністратор"),
        new Roles("JURYMEMBER", "оператор")
      ];
     }

    ngOnInit(): void {}

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    private dataHandler(users: any){
    
        this.users      = users as Array<User>;
        this.dataSource = new MatTableDataSource(this.users);
        this.length     = this.users.length;
        this.pageSize   = 5;
        this.dataSource.sort = this.sort;

        console.log(users);
    
        this.dataSource.paginator              = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
        this.paginator._intl.nextPageLabel     = 'Наступна сторінка';
        this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    }

    private searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
    }

    deleteUser(row){
        for(let curUser = 0; curUser < this.users.length; curUser++){
            if(row.id === this.users[curUser].id){
                this.users.splice(curUser,1);
            }
        }
        
        this.adminService.deleteUser(row.id);
        this.dataHandler(this.users);
    }

    showRow(row) {
        const dialogRef = this.dialog.open(UserDialogAdminPageComponent, {
          data: row,
          height: '60%',
          width:'65%'
        });
      }
    openDialogUser(){
    const dialogRef = this.dialog.open(UserDialogAdminPageComponent, {
        data: new User(),
        height: '60%',
        width:'65%'
        });
    }   

}