import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";


import { TokenService } from "./token.service";

import { User } from "./user.model";
import { RegisterData } from "../../../node_modules/angular2-token";

@Injectable()

export class AuthService{
    public userSimpleUrl = "auth/validate_token";
    public isAdmin: boolean;

    public constructor(private tokenService: TokenService) { }

    public signUp(user: User): Observable<Response> {
        return this.tokenService.registerAccount(user as RegisterData).pipe(
            catchError(this.handleErrors)
        )
            
    }


    public signIn(uid: string, password: string): Observable<Response> {
        let signInData = {
            email: uid,
            password: password
        };

        return this.tokenService.signIn(signInData).pipe(
            catchError(this.handleErrors)
        )
            
    }

    public isUserAdmin(): boolean {
        if (localStorage.getItem("userType") == "A") {
            return true;
        } else {
            return false;
        }
    }

    public getCurrentUser(): Observable<User> {

        return this.tokenService.get(this.userSimpleUrl).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToUserSimple(response) )
        )

    }


    public signOut(): Observable<Response> {
        return this.tokenService.signOut().pipe(
            catchError(this.handleErrors)
        )
            
    }


    public userSignedIn(): boolean {
        return this.tokenService.userSignedIn();
    }

    private handleErrors(error: Response) {
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
        return Observable.throw(error);
    }


    private responseToUserSimple(response: Response): User {

        return new User(
            response.json().data.name,
            response.json().data.email,
            response.json().data.password,
            response.json().data['passwordConfirmation'],
            response.json().data.user_type,
            response.json().data.id 
        )
    }
}