import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomePageComponent } from './homepage/homepage.component';

import { AccountComponent } from "./account/account.component";
import { BillingsComponent } from "./billings/billings.component";
import { BillingDetailComponent } from "./billings/billing-detail/billing-detail.component";
import { BusinessesComponent } from "./businesses/businesses.component";
import { BusinessDetailComponent } from "./businesses/business-detail/business-detail.component";
import { CampaignsComponent } from "./campaigns/campaigns.component";
import { CampaignDetailComponent } from "./campaigns/campaign-detail/campaign-detail.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryDetailComponent } from "./categories/category-detail/category-detail.component";
import { CitiesComponent } from "./cities/cities.component";
import { CityDetailComponent } from "./cities/city-detail/city-detail.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { StoresComponent } from "./stores/stores.component";
import { StoreDetailComponent } from "./stores/store-detail/store-detail.component";
import { StoreTypesComponent } from "./store-types/store-types.component";
import { StoreTypeDetailComponent } from "./store-types/store-type-detail/store-type-detail.component";
import { SubcategoriesComponent } from "./subcategories/subcategories.component";
import { SubcategoryDetailComponent } from "./subcategories/subcategory-detail/subcategory-detail.component";
import { UnitMeasuresComponent } from "./unit-measures/unit-measures.component";
import { UnitMeasureDetailComponent } from "./unit-measures/unit-measure-detail/unit-measure-detail.component";
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { BusinessGuard } from "./guards/business.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

const ROUTES = RouterModule.forRoot([
    //admin area
    { path: 'categories/:id',    component: CategoryDetailComponent, canActivate: [AdminGuard] },
    { path: 'categories',        component: CategoriesComponent, canActivate: [AdminGuard] },
    { path: 'cities/:id',        component: CityDetailComponent, canActivate: [AdminGuard] },
    { path: 'cities',            component: CitiesComponent, canActivate: [AdminGuard] },
    { path: 'products/:id',      component: ProductDetailComponent, canActivate: [AdminGuard] },
    { path: 'products',          component: ProductsComponent, canActivate: [AdminGuard] },
    { path: 'store-types/:id',   component: StoreTypeDetailComponent, canActivate: [AdminGuard] },
    { path: 'store-types',       component: StoreTypesComponent, canActivate: [AdminGuard] },
    { path: 'subcategories/:id', component: SubcategoryDetailComponent, canActivate: [AdminGuard] },
    { path: 'subcategories',     component: SubcategoriesComponent, canActivate: [AdminGuard] },
    { path: 'unit-measures/:id', component: UnitMeasureDetailComponent, canActivate: [AdminGuard] },
    { path: 'unit-measures',     component: UnitMeasuresComponent, canActivate: [AdminGuard] },

    //login/logon area
    { path: 'sign-in',   component: SignInFormComponent, canActivate: [NotAuthenticatedGuard] },
    { path: 'sign-up',   component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },


    //business area
    { path: 'account', component: AccountComponent, canActivate: [BusinessGuard] },
    { path: 'businesses', component: BusinessesComponent, canActivate: [BusinessGuard] },
    { path: 'businesses/:id', component: BusinessDetailComponent, canActivate: [BusinessGuard] },
    { path: 'billings', component: BillingsComponent, canActivate: [BusinessGuard] },
    { path: 'billings/:id', component: BillingDetailComponent, canActivate: [BusinessGuard] },
    { path: 'stores', component: StoresComponent, canActivate: [BusinessGuard] },
    { path: 'stores/:id', component: StoreDetailComponent, canActivate: [BusinessGuard] },
    { path: 'campaigns', component: CampaignsComponent, canActivate: [BusinessGuard] },
    { path: 'campaigns/:id', component: CampaignDetailComponent, canActivate: [BusinessGuard] },

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