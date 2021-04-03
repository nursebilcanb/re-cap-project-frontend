import { Component, Input, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car;
  carDetails:Car;
  

  brands:Brand [];
  colors: Color[];

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private colorService:ColorService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"]);
      this.getBrands();
      this.getColors();
  })

  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  
  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.carDetails = response.data[0];
      this.createCarUpdateForm();
    })
  }


  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.carDetails.carId,Validators.required],
      colorId:[this.carDetails.colorId,Validators.required],
      brandId:[this.carDetails.brandId,Validators.required],
      modelYear:[this.carDetails.modelYear,Validators.required],
      dailyPrice:[this.carDetails.dailyPrice,Validators.required],
      description:[this.carDetails.description,Validators.required]
    })
  }


  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)

      this.carService.update(carModel).subscribe(response => {
      this.toastrService.success('Araç güncellendi','Başarılı') 
      },responseError => {
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama Hatası');
          }
        }
      })
    }else{
      this.toastrService.error('Formunuz eksik','Dikkat')
    }
  }
}
