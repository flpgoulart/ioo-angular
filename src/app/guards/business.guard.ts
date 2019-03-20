import { Injectable } from "@angular/core";

import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Injectable()

export class BusinessGuard implements CanActivate{

    public user_type: string;

    public constructor(private authService: AuthService, private router: Router) {
     }

    public canActivate() {

        this.user_type = localStorage.getItem("userType");

        if (this.user_type == 'E' || this.user_type == 'B' || this.user_type == 'I' || this.user_type == 'A'  ) {
            return true;
        } else {
            alert("Acesso não autorizado!");
            this.router.navigate(['/sign-in']);
            return false;
        }
        
    }
}


