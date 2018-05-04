import { OnInit, Component } from "@angular/core";
import { AUTH_TOKEN, ROLE } from "../constants/projectConstants";
import { SharedService } from "../services/sharedService";
import { LoginService } from "../services/login.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [LoginService]
})

export class MenuComponent implements OnInit {

    private isLogin = localStorage.getItem(AUTH_TOKEN) !== undefined;
    private isAdmin = localStorage.getItem(ROLE)==='ADMIN';
    private isJury  = localStorage.getItem(ROLE)==='JURYMEMBER';
    

    constructor(private sharedService: SharedService, private logService:LoginService) {

        this.sharedService.IsUserLoggedIn.subscribe( value => {
            this.isLogin = value;
        });

        this.sharedService.IsUserAdmin.subscribe( value => {
            this.isAdmin = value;
        });

        this.sharedService.IsUserJury.subscribe( value => {
            this.isJury = value;
        });
    }

    logOut(){
        this.logService.logout();
    }

    ngOnInit(): void {}
}