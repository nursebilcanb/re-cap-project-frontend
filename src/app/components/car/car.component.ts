import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  title ="Araç Listesi"
  cars:Car[]=[];
  imageUrl = "https://localhost:44384/Images/"
  dataLoaded = false;
  filterText="";


  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByFilter(params["brandId"],params["colorId"])
        console.log("if")
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }
      else if(params["carId"]){
        this.getCarDetails(params["carId"]);
      }
      else{
        this.getCars()
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded=true;
      
    });
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByFilter(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      if(this.cars.length==0){
        this.toastrService.info("Arama sonucunuza ait araç bulunamamaktadır.","Arama sonucu")
      }
    })
  }
  
  getRent(car:Car){
    this.toastrService.success("Sepete eklendi",car.brandName)
  
}
}
