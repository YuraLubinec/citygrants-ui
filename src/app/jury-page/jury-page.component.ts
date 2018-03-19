import { Component, OnInit,ViewChild} from '@angular/core';
import { JuryService } from '../services/jury.service';
import { ProjectApplication } from '../models/projectApplication';
import {MatPaginator, PageEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { DialogJuryProjectPageComponent } from '../dialog-jury-project-page/dialog-jury-project-page.component';
import { ProjectApplJury } from '../models/projectApplJury';

@Component({
  selector: 'app-jury-page',
  templateUrl: './jury-page.component.html',
  styleUrls: ['./jury-page.component.css'],
  providers: [JuryService]
})

export class JuryPageComponent implements OnInit {

  private projects   : Array<ProjectApplJury>;
  private dataSource : any;
  private length     : Number;
  private pageSize   : Number;
  private pageEvent  : PageEvent;
  private pageSizeOptions  = [5, 10, 25, 50];
  private displayedColumns = ['nameOfProject', 'requestedBudget', 'organizationName', 'theme','goal','evalFirst','evalSecond'];
  private positionTollTip = "above";
  

  constructor(private juryService: JuryService, public dialog:MatDialog) {
   
  }

  ngOnInit(): void {
    this.juryService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private dataHandler(projects: any){
    this.projects        = projects as Array<ProjectApplJury>;
    this.dataSource      = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;

    console.log(this.dataSource);

    this.dataSource.sortingDataAccessor = (data: any, property: string) => {
      switch (property) {
        case 'requestedBudget': return +data.description.requestedBudget;
        case 'evalFirst': return +data.evaluation.evalActual 
                            + data.evaluation.evalAttracting
                            + data.evaluation.evalCompetence
                            + data.evaluation.evalEfficiency
                            + data.evaluation.evalInnovation
                            + data.evaluation.evalIntelligibility
                            + data.evaluation.evalParticipation
                            + data.evaluation.evalStability;
        case 'evalSecond': return +data.interviewEvaluation.evaluation;                   
        default: return '';
      }
    };

    this.dataSource.filterPredicate =
    (data: any, filter: string) => data.description.name.indexOf(filter) != -1;

    this.length   = this.projects.length;
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
    const dialogRef = this.dialog.open(DialogJuryProjectPageComponent, {
      data: row,
      height: '90%',
      width:'70%'
    });
  }
  
  private searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
  
}

