import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomePageComponent } from './homepage/homepage.component';
import { CitiesComponent } from "./cities/cities.component";
// import { OccupationAreaDetailComponent } from './occupation-areas/occupation-area-detail/occupation-area-detail.component';
 import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
 import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
// import { SocialEntitiesComponent } from "./social-entities/social-entities.component";
// import { SocialEntityCreateComponent } from "./social-entities/social-entity-create/social-entity-create.component";
// import { TargetAudiencesComponent } from "./target-audiences/target-audiences.component";
// import { TargetAudienceDetailComponent } from "./target-audiences/target-audience-detail/target-audience-detail.component";
// import { VolunteersComponent } from "./volunteers/volunteers.component";
// import { VolunteerCreateComponent } from "./volunteers/volunteer-create/volunteer-create.component";

 import { AuthGuard } from "./guards/auth.guard";
// import { IsAdminGuard } from "./guards/is-admin.guard";
 import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
// import { SocialEntityGuard } from "./guards/social-entity.guard";

const ROUTES = RouterModule.forRoot([
    //admin area
    //{ path: 'cities/:id', component: OccupationAreaDetailComponent, canActivate: [IsAdminGuard] },
    { path: 'cities',     component: CitiesComponent },
    // { path: 'target-audiences/:id', component: TargetAudienceDetailComponent, canActivate: [IsAdminGuard] },
    // { path: 'target-audiences',     component: TargetAudiencesComponent, canActivate: [IsAdminGuard] },

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
     { path: 'homepage', component: HomePageComponent, canActivate: [NotAuthenticatedGuard] },
     { path: '', redirectTo: '/homepage', pathMatch: 'full' },

  ])

  @NgModule({
    imports: [ROUTES],
    exports: [RouterModule]
  })

export class AppRoutingModule{ }