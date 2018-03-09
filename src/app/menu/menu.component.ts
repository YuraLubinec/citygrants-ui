import { OnInit, Component } from "@angular/core";
import { AUTH_TOCKEN, ROLE } from "../constants/projectConstants";
import { SharedService } from "../services/sharedService";
import { LoginService } from "../services/login.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [LoginService]
})

export class MenuComponent implements OnInit {

    private isLogin = localStorage.getItem(AUTH_TOCKEN) !== undefined;
    private isAdmin = localStorage.getItem(ROLE)==='ADMIN';
    

    constructor(private sharedService: SharedService, private logService:LoginService) {
        this.sharedService.IsUserLoggedIn.subscribe( value => {
            this.isLogin = value;
            if(this.isLogin && localStorage.getItem(ROLE)==='ADMIN'){
                this.isAdmin = true;
            }
        });
    }

    logOut(){
        this.logService.logout();
    }

    ngOnInit(): void {}
}