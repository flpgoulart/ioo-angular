import { Injectable } from "@angular/core";

import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Injectable()

//dá para criar um Guard para os usuários administradores

export class AdminGuard implements CanActivate{

    public constructor(private authService: AuthService, private router: Router) {
     }

    public canActivate() {

        if (this.authService.isUserAdmin()) {
            return true;
        } else {
            alert("Acesso não autorizado!");
            this.router.navigate(['/sign-in']);
            return false;
        }
        
    }
}


