import { Component, OnInit,ViewChild} from '@angular/core';
import { JuryService } from '../services/jury.service';
import { ProjectApplication } from '../models/projectApplication';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'app-jury-page',
  templateUrl: './jury-page.component.html',
  styleUrls: ['./jury-page.component.css'],
  providers: [JuryService]
})

export class JuryPageComponent implements OnInit {

  private projects : Array<ProjectApplication>;
  private displayedColumns = ['nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal'];
  private dataSource : any;

  private length : Number;
  private pageSize : Number;
  private pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(private juryService: JuryService) {
    this.juryService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
  }

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private dataHandler(projects: any){
    this.projects = projects as Array<ProjectApplication>;
    this.dataSource = new MatTableDataSource(this.projects);
    this.length = this.projects.length;
    this.pageSize = 5;

    this.dataSource.paginator = this.paginator;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  private searchErrorHandler(error: any) {
    console.log(error);
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
  
}

