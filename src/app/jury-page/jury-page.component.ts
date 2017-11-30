import { Component, OnInit } from '@angular/core';
import { JuryService } from '../services/jury.service';
import { ProjectApplication } from '../models/projectApplication';

@Component({
  selector: 'app-jury-page',
  templateUrl: './jury-page.component.html',
  styleUrls: ['./jury-page.component.css'],
  providers: [JuryService]
})

export class JuryPageComponent implements OnInit {

  private projects : Array<ProjectApplication>;

  constructor(private juryService: JuryService) {
    this.juryService.getAllProjects().subscribe(data => this.dataHandler(data),this.searchErrorHandler);
  
  }

  ngOnInit(): void {}

  private dataHandler(projects: any){
    this.projects = projects as Array<ProjectApplication>;
    console.log(projects);
  }

  private searchErrorHandler(error: any) {
    console.log(error);
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }
}
