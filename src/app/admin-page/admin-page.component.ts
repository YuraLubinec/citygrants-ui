import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { ProjectAdm } from '../models/projectAdm';

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
  private displayedColumns = ['nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal','totalEvalFirstStage'];

  constructor(private adminService: AdminService) {
    adminService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
   }

  ngOnInit() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
    private dataHandler(projects: any){
      this.projects   = projects as Array<ProjectAdm>;
      this.dataSource = new MatTableDataSource(this.projects);
      this.length     = this.projects.length;
      this.pageSize   = 5;
  
      this.dataSource.paginator              = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
      this.paginator._intl.nextPageLabel     = 'Наступна сторінка';
      this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    }

    private searchErrorHandler(error: any) {
      alert("Вході виконання програми виникла помилка, спробуйте пізніше");
    }
}
