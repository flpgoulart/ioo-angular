import { Component, OnInit } from "@angular/core";

import { AuthService } from "../shared/auth.service";
import { TokenService } from "../shared/token.service";

import { UserSimple } from '../shared/user-simple.model';
import { Token } from "../../../node_modules/@angular/compiler";

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html'
})

export class HomePageComponent implements OnInit{

    public currentUser: UserSimple;

    public constructor(private authService: AuthService, tokenService: TokenService ){

    }

    
    public ngOnInit(){

        this.authService.getCurrentUser()
        .subscribe(
            currentUser => this.currentUser = currentUser,
            error => alert("usuario local não encontrado!")
        )
    }
}