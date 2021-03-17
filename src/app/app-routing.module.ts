import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  // {path:"",pathMatch:"full", component:CarComponent},
  // {path:"cars", component:CarComponent},
  // {path:"cars/color/:colorId", component:CarComponent},
  // {path:"cars/brand/:brandId", component:CarComponent},

  // {path:"cars/cardetail/:carId", component:CarDetailComponent}
  {path :"", pathMatch:"full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path:"brands",component: BrandComponent},
  {path:"colors",component: ColorComponent},
  {path:"cars/brand/:brandId", component: CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
