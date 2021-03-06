import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { CardSavedComponent } from './components/payment/card-saved/card-saved.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"", pathMatch:"full", component: CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/customers", component: CustomerComponent},
  {path:"cars/brand/:brandId", component: CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  
  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},

  {path:"rental/:carId",component:RentalComponent},
  {path:"cars/rental/:carId",component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},

  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"cars/delete",component:CarDeleteComponent},

  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},
  {path:"brands/delete",component:BrandDeleteComponent},

  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/delete",component:ColorDeleteComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},

  {path:"cardSaved",component:CardSavedComponent}






  






  




  // {path:"cars/brand/:brandId/cars/cardetail/:carId",component:CarDetailComponent},
  // {path:"cars/color/:colorId/cars/cardetail/:carId",component:CarDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
