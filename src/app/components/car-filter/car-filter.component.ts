import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  colors:Color[];
  cars:Car[];
  brands:Brand[];
  currentBrand:number;
  currentColor:number;
  dataLoaded=false;

  constructor(private colorService:ColorService,private brandService:BrandService,private carService:CarService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
  
  IsCurrentBrandNull(){
    if(this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentColorNull(){
    if(this.currentColor){
      return true;
    }else{
      return false;
    }
  }

  getCurrentBrand(brand:Brand){
    if(this.currentBrand==brand.brandId){
      return true;
    }else{
      return false;
    }
  }

  getCurrentColor(color:Color){
    if(color.colorId==this.currentColor){
      return true;
    }else{
      return false;
    }
  }

  getRouterLink(){
    if(this.currentBrand && this.currentColor){
      return "/cars/filter/brand/"+this.currentBrand+"/color/"+this.currentColor;
      // return this.carService.getCarsByBrandAndColorId(this.currentBrand,this.currentColor).subscribe(response => {
      //   this.cars = response.data;
      //   this.dataLoaded =true;
      // })
    }else if(this.currentBrand){
      return "/cars/filter/brand/"+this.currentBrand;
    }else if(this.currentColor){
      return "/cars/filter/color/"+this.currentColor;
    }else{
      return "/cars";
    }
  }

}
