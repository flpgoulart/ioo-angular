//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

// components imports
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AccountComponent } from "./account/account.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryDetailComponent } from "./categories/category-detail/category-detail.component";
import { CitiesComponent } from "./cities/cities.component";
import { CityDetailComponent } from "./cities/city-detail/city-detail.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { SubcategoriesComponent } from "./subcategories/subcategories.component";
import { SubcategoryDetailComponent } from "./subcategories/subcategory-detail/subcategory-detail.component";
import { StoreTypesComponent } from './store-types/store-types.component';
import { StoreTypeDetailComponent } from './store-types/store-type-detail/store-type-detail.component';
import { UnitMeasuresComponent } from "./unit-measures/unit-measures.component";
import { UnitMeasureDetailComponent } from "./unit-measures/unit-measure-detail/unit-measure-detail.component";
import { SignInFormComponent } from './sign-in-form/sign-in-form.component'
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'

// services imports
import { AuthService } from "./shared/auth.service";
import { BusinessAccountService } from "./account/shared/business-account.service";
import { CategoryService } from "./categories/shared/category.service";
import { CityService } from "./cities/shared/city.service";
import { ProductService } from "./products/shared/product.service";
import { SubcategoryService } from "./subcategories/shared/subcategory.service";
import { StoreTypeService } from './store-types/shared/store-type.service';
import { UnitMeasureService } from "./unit-measures/shared/unit-measure.service";
import { TokenService } from "./shared/token.service";

// guards imports
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { BusinessGuard } from "./guards/business.guard";
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
    AccountComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CitiesComponent,
    CityDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    StoreTypesComponent,
    StoreTypeDetailComponent,
    SubcategoriesComponent,
    SubcategoryDetailComponent,
    UnitMeasuresComponent,
    UnitMeasureDetailComponent,
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
    AdminGuard,
    BusinessGuard,
    AuthService,
    NotAuthenticatedGuard,
    BusinessAccountService,
    CategoryService,
    CityService,
    ProductService,
    StoreTypeService,
    SubcategoryService,
    UnitMeasureService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
