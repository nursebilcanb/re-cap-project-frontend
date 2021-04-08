import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ColorComponent } from './components/color/color.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';

import {ToastrModule} from 'ngx-toastr';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { AuthMenuComponent } from './components/navi/auth-menu/auth-menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CardSavedComponent } from './components/payment/card-saved/card-saved.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    BrandComponent,
    CustomerComponent,
    ColorComponent,
    CarDetailComponent,
    CarFilterPipePipe,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    CarFilterComponent,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
    CarDeleteComponent,
    LoginComponent,
    RegisterComponent,
    AuthMenuComponent,
    ProfileComponent,
    CardSavedComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
