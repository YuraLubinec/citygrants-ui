import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../services/admin.service'
import {MatPaginator, PageEvent, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {User} from '../models/user';
import {DialogAdminUserPageComponent} from '../dialog-admin-user-page/dialog-admin-user-page.component';
import {Roles} from '../models/roles';
import {DialogConfirmDeletePageComponent} from "../dialog-confirm-delete-page/dialog-confirm-delete-page.component";


@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.css'],
  providers: [AdminService]
})

export class ManageUserPageComponent implements OnInit {
  private users: Array<User>;
  private dataSource: any;
  private length: Number;
  private pageSize: Number;
  private pageEvent: PageEvent;
  private pageSizeOptions = [5, 10, 25, 50];
  private displayedColumns = ['login', 'fullName', 'role', 'buttons'];
  private selection: SelectionModel<User>;
  private positionTollTip = "above";
  private userRoles: Array<Roles>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService, public dialog: MatDialog, public dialogConfirm: MatDialog) {

    this.userRoles = [
      new Roles("ADMIN", "адміністратор"),
      new Roles("JURYMEMBER", "оператор")
    ];
  }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    this.selection = new SelectionModel<User>(true, []);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private dataHandler(users: any) {

    this.users = users as Array<User>;
    this.dataSource = new MatTableDataSource(this.users);
    this.length = this.users.length;
    this.pageSize = 5;
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
  }

  private searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

  openDialogConfirmRemove(row): void {
    let dialogRef = this.dialogConfirm.open(DialogConfirmDeletePageComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {

      result == 'confirm' ? this.deleteUser(row) : 'doNothing';
    });

  }

  deleteUser(row) {
    for (let curUser = 0; curUser < this.users.length; curUser++) {
      if (row.id === this.users[curUser].id) {
        this.users.splice(curUser, 1);
      }
    }

    this.adminService.deleteUser(row.id);
    this.dataHandler(this.users);
  }

  showRow(row) {
    const dialogRef = this.dialog.open(DialogAdminUserPageComponent, {
      data: row,
      height: '60%',
      width: '65%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let index = this.users.findIndex(user => user.id == result.id);
        this.users.splice(index, 1);
        this.users.splice(index, 0, result);
        this.dataHandler(this.users);
      }
    });
  }

  openDialogUser() {
    const dialogRef = this.dialog.open(DialogAdminUserPageComponent, {
      data: new User(),
      height: '60%',
      width: '65%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.users.push(result);
        this.dataHandler(this.users.reverse());
      }
    });
  }

}
