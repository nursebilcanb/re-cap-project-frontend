import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {

  carId:number;
  customers:Customer[];
  cars:Car[]
  rentals:Rental[]=[];
  dataLoaded=false;
  rentDate:Date;
  returnDate:Date;
  customerId:number;
  @Input() car:Car;//Input()?



  minDate:string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(private rentalService:RentalService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router,
    private datePipe:DatePipe,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
    if(params["carId"]){
      this.carId = params["carId"];
      this.getCars(params["carId"]);
    }
  })
    this.getCustomer();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded=true;
    });
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      this.dataLoaded=true;
    })
  }

  getCars(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car= response.data[0]
    })
  }

  checkRentableCar(){ 

    this.rentalService.getRentalById(this.carId).subscribe(response => {
      if(response.data[0]==null){
        this.createRental();
        return true;
      }
      let lastItem = response.data[response.data.length-1]
      if(lastItem.returnDate==null){
        return this.toastrService.error('Bu ara?? teslim edilmemi??','Teslim Tarihi Ge??ersiz');
      }
      let returnDate = new Date(lastItem.returnDate);
      let rentDate = new Date(this.rentDate);
      if(rentDate < returnDate){
        return this.toastrService.error('Bu ara?? bu tarihler aras??nda kiralanamaz','Ge??ersiz tarih se??imi')
      }
      this.createRental();
      return true;
    })

  }

  createRental(){
    let createdRental : Rental ={
      carId: this.car.carId,
      brandName: this.car.brandName,
      colorName: this.car.colorName,
      carModelYear: this.car.modelYear,
      carDailyPrice: this.car.dailyPrice,
      carDescription: this.car.description,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId
    };
    if(createdRental.customerId == undefined || createdRental.rentDate == undefined){
      this.toastrService.error('Eksik bilgi girdiniz','Bilgilerinizi kontrol ediniz')
    }
    else{
      this.router.navigate(['/payment/',JSON.stringify(createdRental)]);
      this.toastrService.info('??deme sayfas??na y??nlendiriliyorsunuz.','??deme ????lemleri')
    }
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }


  isLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    return false;
  }

  checkFindexPoint(){
    this.carService.getCarDetails(this.carId).subscribe(response => {
      
      let customer = this.localStorageService.getCurrentCustomer();

      if(customer.findexPoint === 0){
        this.toastrService.warning("Kullan??c??n??n findeks puan?? s??f??rd??r","Dikkat");
        return  this.router.navigateByUrl("/cars");
      }

      let car:Car = response.data[0];
      if(customer.findexPoint < car.findexPoint){
        this.toastrService.warning("Findeks puan??n??z yetersiz","Dikkat");
        return  this.router.navigate(["/cars"]);
      }
      return this.checkRentableCar();
    })
  }


}
