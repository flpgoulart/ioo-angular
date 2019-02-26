import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomePageComponent } from './homepage/homepage.component';
import { CitiesComponent } from "./cities/cities.component";
import { CityDetailComponent } from "./cities/city-detail/city-detail.component";
import { UnitMeasuresComponent } from "./unit-measures/unit-measures.component";
import { UnitMeasureDetailComponent } from "./unit-measures/unit-measure-detail/unit-measure-detail.component";
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

 import { AuthGuard } from "./guards/auth.guard";
 import { AdminGuard } from "./guards/admin.guard";
 import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
// import { SocialEntityGuard } from "./guards/social-entity.guard";

const ROUTES = RouterModule.forRoot([
    //admin area
    { path: 'cities/:id', component: CityDetailComponent, canActivate: [AdminGuard] },
    { path: 'cities',     component: CitiesComponent, canActivate: [AdminGuard] },
    { path: 'unit-measures/:id', component: UnitMeasureDetailComponent, canActivate: [AdminGuard] },
    { path: 'unit-measures',     component: UnitMeasuresComponent, canActivate: [AdminGuard] },

    //user area
     { path: 'sign-in',   component: SignInFormComponent, canActivate: [NotAuthenticatedGuard] },
     { path: 'sign-up',   component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },

    // // user area - social entity
    // { path: 'social-entities', component: SocialEntitiesComponent, canActivate: [AuthGuard]},
    // { path: 'social-entity-create', component: SocialEntityCreateComponent, canActivate: [SocialEntityGuard]},

    // // user area - volunteer
    // { path: 'volunteers', component: VolunteersComponent, canActivate: [AuthGuard]},
    // { path: 'volunteer-create', component: VolunteerCreateComponent, canActivate: [AuthGuard]},
    
    // // common area
     { path: 'homepage', component: HomePageComponent, canActivate: [AuthGuard] },
     { path: '', redirectTo: '/homepage', pathMatch: 'full' },

  ])

  @NgModule({
    imports: [ROUTES],
    exports: [RouterModule]
  })

export class AppRoutingModule{ }