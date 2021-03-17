import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  imageUrl = 'https://localhost:44348/'
  dataLoaded = false;

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
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

 

  
}
