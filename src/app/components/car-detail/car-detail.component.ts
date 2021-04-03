import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[];
  carId:number;
  car:Car;
  currentCar:Car;
  imageUrl = 'https://localhost:44384/Images/';
  dataLoaded =false;

  constructor(private carImageService:CarImageService,
    private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.carId = params["carId"];
        this.getCarDetails(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      }
    })
 
  }

  //Bunu fazla yazdım sanırım
  getCarImages(){
    this.carImageService.getCarImages().subscribe(response =>{
      this.carImages = response.data;
      this.dataLoaded=true;
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response =>{
      this.carImages = response.data;
      this.dataLoaded=true;
    })
  }


  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response =>{
      this.car = response.data[0];
      this.dataLoaded=true;
    })
  }
  getSliderClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
  

  setCurrentCar(car:Car){
    this.currentCar = car;    
  }

  getCurrentCarClass(car:Car){
    if(car == this.currentCar){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
