import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [AdminService]
})
export class AdminPageComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

}
