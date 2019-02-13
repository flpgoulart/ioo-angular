//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

// components imports
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { OccupationAreasComponent } from "./occupation-areas/occupation-areas.component";
// import { OccupationAreaDetailComponent } from "./occupation-areas/occupation-area-detail/occupation-area-detail.component";
 import { SignInFormComponent } from './sign-in-form/sign-in-form.component'
 import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'
// import { SocialEntitiesComponent } from "./social-entities/social-entities.component";
// import { SocialEntityCreateComponent } from "./social-entities/social-entity-create/social-entity-create.component";
// import { TargetAudiencesComponent } from "./target-audiences/target-audiences.component";
// import { TargetAudienceDetailComponent } from "./target-audiences/target-audience-detail/target-audience-detail.component";
// import { VolunteersComponent } from "./volunteers/volunteers.component";
// import { VolunteerCreateComponent } from "./volunteers/volunteer-create/volunteer-create.component";

// services imports
 import { AuthService } from "./shared/auth.service";
// import { OccupationAreaService } from "./occupation-areas/shared/occupation-area.service";
// import { SocialEntityService } from "./social-entities/shared/social-entity.service";
// import { TargetAudienceService } from './target-audiences/shared/target-audience.service';
 import { TokenService } from "./shared/token.service";
// import { VolunteerService } from "./volunteers/shared/volunteer.service";

// guards imports
 import { AuthGuard } from "./guards/auth.guard";
// import { IsAdminGuard } from "./guards/is-admin.guard";
 import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
// import { SocialEntityGuard } from "./guards/social-entity.guard";

// modules imports
import { AppRoutingModule } from "./app-routing.module";

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';
window['datetimepicker'] = window['datetimepicker'] = datetimepicker;


//-----------------------------
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    // OccupationAreasComponent,
    // OccupationAreaDetailComponent,
     SignInFormComponent,
     SignUpFormComponent,
    // SocialEntitiesComponent,
    // SocialEntityCreateComponent,
    // TargetAudiencesComponent,
    // TargetAudienceDetailComponent,
    // VolunteersComponent,
    // VolunteerCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
     AuthGuard,
     AuthService,
    // IsAdminGuard,
     NotAuthenticatedGuard,
    // OccupationAreaService,
    // SocialEntityGuard,
    // SocialEntityService,
    // TargetAudienceService,
    TokenService,
    // VolunteerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
