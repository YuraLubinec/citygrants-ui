import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { MatPaginator, PageEvent, MatTableDataSource, MatSort } from '@angular/material';
import { ProjectAdm } from '../models/projectAdm';
import {SelectionModel} from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';

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
  private displayedColumns = ['select', 'nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal','totalEvalFirstStage'];
  private selection  : SelectionModel<ProjectAdm>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) {
    adminService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
    this.selection = new SelectionModel<ProjectAdm>(true, []); 
   }

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteSelectedProject(){

    for(let selProj = 0; selProj < this.selection.selected.length; selProj++){
      for(let curProj = 0; curProj < this.projects.length; curProj++){
        if(this.selection.selected[selProj].id === this.projects[curProj].id){
          this.projects.splice(curProj,1);
        }
      }
    }
    this.adminService.deleteSelectedProject(this.selection.selected);
    this.dataHandler(this.projects);
  }

  showRow(row) {
    console.log("tra ta ta");
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
