import { Component, OnInit } from "@angular/core";

import { AuthService } from "../shared/auth.service";
import { TokenService } from "../shared/token.service";
import { Router } from "@angular/router";

import { User } from '../shared/user.model';
import { Token } from "../../../node_modules/@angular/compiler";

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html'
})

export class HomePageComponent implements OnInit{

    public currentUser: User;

    public constructor(private authService: AuthService, tokenService: TokenService, private router: Router ){

    }

    public signOutUser() {
        this.authService.signOut()
            .subscribe(
                () => this.router.navigate(['/sign-in'])
            )
    }

    public ngOnInit(){

        this.authService.getCurrentUser()
        .subscribe(
            currentUser => {
                this.currentUser = currentUser;
                localStorage.setItem("userType", this.currentUser.user_type);
            },
            error => alert("usuario local não encontrado!")
        )
    }
}