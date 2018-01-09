import { Component, OnInit,ViewChild} from '@angular/core';
import { JuryService } from '../services/jury.service';
import { ProjectApplication } from '../models/projectApplication';
import {MatPaginator, MatTableDataSource, PageEvent, MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import { JuryDialogPageComponent } from '../project-dialog-page/project-dialog-page.component';
import { ProjectApplJury } from '../models/projectApplJury';

@Component({
  selector: 'app-jury-page',
  templateUrl: './jury-page.component.html',
  styleUrls: ['./jury-page.component.css'],
  providers: [JuryService]
})

export class JuryPageComponent implements OnInit {

  private projects : Array<ProjectApplJury>;
  private displayedColumns = ['nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal'];
  private dataSource : any;
  private length : Number;
  private pageSize : Number;
  private pageSizeOptions = [5, 10, 25, 50];
  private pageEvent: PageEvent;

  constructor(private juryService: JuryService, public dialog:MatDialog) {
    this.juryService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
  }

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private dataHandler(projects: any){
    this.projects = projects as Array<ProjectApplJury>;
    this.dataSource = new MatTableDataSource(this.projects);
    this.length = this.projects.length;
    this.pageSize = 5;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  selectRow(row) {
    const dialogRef = this.dialog.open(JuryDialogPageComponent, {
      data: row,
      height: '1000px'
    });
  }
  
  private searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
  
}

