import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../services/admin.service'
import {MatPaginator, PageEvent, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {ProjectAdm} from '../models/projectAdm';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogAdminProjectPageComponent} from '../dialog-admin-project-page/dialog-admin-project-page.component';
import {DialogConfirmDeletePageComponent} from "../dialog-confirm-delete-page/dialog-confirm-delete-page.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [AdminService]
})
export class AdminPageComponent implements OnInit {
  public projects: Array<ProjectAdm>;
  public dataSource: any;
  public length: Number;
  public pageSize: Number;
  public pageEvent: PageEvent;
  public pageSizeOptions = [5, 10, 25, 50];
  public displayedColumns = ['nameOfProject', 'requestedBudget', 'theme', 'totalEvalFirstStage', 'totalEvalSecondStage', 'select', 'buttons'];
  public selection: SelectionModel<ProjectAdm>;
  public positionTollTip = "above";

  public checked = true;
  public tour1 = "1-ий тур"
  public tour2 = "2-ий тур"


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public adminService: AdminService, public dialog: MatDialog, public dialogConfirm: MatDialog) {
    adminService.getAllProjects().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    this.selection = new SelectionModel<ProjectAdm>(true, []);
  }

  ngOnInit() {}

  changeTourOfProject(row) {
    row.approvedToSecondStage = row.approvedToSecondStage == true;
    this.adminService.updateApprovedToSecondStage(row.id, row.approvedToSecondStage);
  }

  deleteProject(row) {
    for (let curProj = 0; curProj < this.projects.length; curProj++) {
      if (row.id === this.projects[curProj].id) {
        this.projects.splice(curProj, 1);
      }
    }

    this.adminService.delete(row.id);
    this.dataHandler(this.projects);
  }

  openDialogConfirmRemove(row): void {
    let dialogRef = this.dialogConfirm.open(DialogConfirmDeletePageComponent, {
      width: '500px',
      minWidth:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      result == 'confirm' ? this.deleteProject(row) : 'doNothing';
    });

  }

  showRow(row) {
    const dialogRef = this.dialog.open(DialogAdminProjectPageComponent, {
      data: row,
      height: '90%',
      minWidth: '95%'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let index = this.projects.findIndex(project => project.id == result.id);
        this.projects.splice(index, 1);
        this.projects.splice(index, 0, result);

        this.dataHandler(this.projects);
      }
    });
  }

  selectRow(event, row) {
    this.selection.toggle(row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public dataHandler(projects: Array<ProjectAdm>) {

    this.projects = projects as Array<ProjectAdm>;
    this.dataSource = new MatTableDataSource(this.projects);
    this.length = this.projects.length;
    this.pageSize = 5;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (data: any, property: string) => {
      switch (property) {
        case 'requestedBudget':
          return +data.description.requestedBudget;
        case 'totalEvalFirstStage':
          return +data.totalEvalFirstStage;
        case 'totalEvalSecondStage':
          return +data.totalEvalSecondStage;
        default:
          return '';
      }
    };

    this.dataSource.filterPredicate =
      (data: any, filter: string) => data.description.name.indexOf(filter) != -1;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
  }

  public searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

}
