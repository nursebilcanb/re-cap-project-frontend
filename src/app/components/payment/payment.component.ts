import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  nameOnTheCard:string;
  cardNumber:string;
  expirationDate:string;
  cardCvv:string;
  moneyInTheCard:number;



  customer:Customer;
  rental :Rental;
  cars:Car;//Car[]?
  paymentAmount : number = 0;
  creditCard: CreditCard;
  cardExist:boolean =false;
  getCustomerId:number;



  constructor(
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private carService:CarService,
    private router :Router,
    private toastrService:ToastrService,
    private creditCardService:CreditCardService,
    private rentalService:RentalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId =JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetails();
      }
    });
  }

  getCustomerDetailById(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
    })
  }

  getCarDetails(){
    this.carService.getCarDetails(this.rental.carId).subscribe(response => {
      this.cars = response.data[0];
      this.calculatePayment();
    })
  }

  calculatePayment(){
    if(this.rental.returnDate != null){
      var returnDate = new Date(this.rental.returnDate.toString());
      var rentDate = new Date(this.rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.paymentAmount = rentDays * this.cars.dailyPrice;
      if(this.paymentAmount <= 0){
        this.router.navigate(['/cars']);
        this.toastrService.error('Ana sayfaya yönlendiriliyorsunuz','Hatalı işlem');
      }
    }
  }

  async rentACar(){
    let verifyCreditCard:CreditCard ={
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv
    }

    this.cardExist = await this.isCardExist(verifyCreditCard);
    if(this.cardExist){
      this.creditCard = await this.getCreditCardByCardNumber(this.cardNumber);
      console.log(this.creditCard);
      if(this.creditCard.moneyInTheCard as number >= this.paymentAmount){
        this.creditCard.moneyInTheCard = this.creditCard.moneyInTheCard as number - this.paymentAmount;
        this.updateCard(verifyCreditCard);
        this.rentalService.addRental(this.rental);
        this.toastrService.success('Arabayı kiraladınız','İşlem başarılı');
      }else{
        this.toastrService.error('Kartınızda yeterli bakiye yoktur','Hata');
      }
    }else{
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı','Hata');
    }
  }

  async isCardExist(creditCard:CreditCard){
    return (await this.creditCardService.verifyCard(creditCard).toPromise()).success;
  }

  async getCreditCardByCardNumber(cardNumber:string){
    return (await this.creditCardService.getByCardNumber(cardNumber).toPromise()).data[0];
  }

  updateCard(creditCard:CreditCard){
    this.creditCardService.updateCard(creditCard);
  }
}
