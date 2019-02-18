//angular imports
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

// components imports
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CitiesComponent } from "./cities/cities.component";
import { CityDetailComponent } from "./cities/city-detail/city-detail.component";
import { SignInFormComponent } from './sign-in-form/sign-in-form.component'
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'

// services imports
import { AuthService } from "./shared/auth.service";
import { CityService } from "./cities/shared/city.service";
import { TokenService } from "./shared/token.service";

// guards imports
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

// modules imports
import { AppRoutingModule } from "./app-routing.module";

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';
window['datetimepicker'] = window['datetimepicker'] = datetimepicker;

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

//-----------------------------
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    CitiesComponent,
    CityDetailComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule

  ],
  providers: [
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    CityService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
