import { OnInit, Component } from "@angular/core";
import { AdminService } from "../services/admin.service";


@Component({
    selector: 'app-menge-user-page',
    templateUrl: './meneg-user-page.component.html',
    styleUrls: ['./meneg-user-page.component.css'],
    providers: [AdminService]
  })

export class MenegeUserPageComponent implements OnInit {
    
    ngOnInit(): void {}

}