import { Component, OnInit } from '@angular/core';
import { JuryService } from '../services/jury.service';
import { ProjectApplication } from '../models/projectApplication';
import {MatTableDataSource} from '@angular/material';

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

  constructor(private juryService: JuryService) {
    this.juryService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
  }

  ngOnInit(): void {}

  private dataHandler(projects: any){
    this.projects = projects as Array<ProjectApplication>;
    this.dataSource = new MatTableDataSource(this.projects);
  }

  private searchErrorHandler(error: any) {
    console.log(error);
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
}
