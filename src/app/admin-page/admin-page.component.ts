import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { MatPaginator, PageEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ProjectAdm } from '../models/projectAdm';
import {SelectionModel} from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';
import { AdminDialogPageComponent } from '../project-dialog-admin-page/project-dialog-admin-page.component';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [AdminService]
})
export class AdminPageComponent implements OnInit {
  private projects   : Array<ProjectAdm>;
  private dataSource : any;
  private length     : Number;
  private pageSize   : Number;
  private pageEvent  : PageEvent;
  private pageSizeOptions  = [5, 10, 25, 50];
  private displayedColumns = ['select', 'nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal','totalEvalFirstStage','buttons'];
  private selection  : SelectionModel<ProjectAdm>;
  private positionTollTip = "above";
  
  private checked = true;
  private tour1 ="1-ий тур"
  private tour2 ="2-ий тур" 
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService, public dialog:MatDialog) {
    adminService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
    this.selection = new SelectionModel<ProjectAdm>(true, []); 
   }

   changeTourOfProject(row){
     row.approvedToSecondStage = row.approvedToSecondStage == true ? false : true;

     this.adminService.updateApprovedToSecondStage(row.id, row.approvedToSecondStage);
   }

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  deleteProject(row){

      for(let curProj = 0; curProj < this.projects.length; curProj++){
        if(row.id === this.projects[curProj].id){
          this.projects.splice(curProj,1);
        }
      }
      
    this.adminService.delete(row.id);
    this.dataHandler(this.projects);
  }

  showRow(row) {
    const dialogRef = this.dialog.open(AdminDialogPageComponent, {
      data: row,
      height: '90%',
      width:'70%'
    });
  }

  selectRow(event,row) {
      this.selection.toggle(row);
  }



  ngOnInit() {}

  private dataHandler(projects: any){
    this.projects   = projects as Array<ProjectAdm>;
    this.dataSource = new MatTableDataSource(this.projects);
    this.length     = this.projects.length;
    this.pageSize   = 5;
    this.dataSource.sort = this.sort;

    this.dataSource.paginator              = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel     = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
  }

  private searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
}
