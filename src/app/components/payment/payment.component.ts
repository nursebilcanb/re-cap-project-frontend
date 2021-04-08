import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  save:boolean = true;
selectedCardId: number= 0;

  nameOnTheCard:string;
  cardNumber:string;
  expirationDate:string;
  cardCvv:string;
  moneyInTheCard:number;
  customerId:number;



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
    private rentalService:RentalService,
    private localStorageService:LocalStorageService
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

  rentACar(){
    // @ts-ignore
    let verifyCreditCard:CreditCard ={
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv,
      customerId:this.localStorageService.getCurrentCustomer().customerId
    }

    this.updateMoney()

    if(this.save)
    {
      this.saveCard(verifyCreditCard)
    }

    this.rentalService.addRental(this.rental).subscribe(response => {
      this.toastrService.success('Arabayı kiraladınız','İşlem başarılı');
      this.updateFindexPointOfCurrentCustomer();
      this.router.navigateByUrl("/cars");
    });

  }

  updateMoney(){
    if(this.selectedCard){
      this.creditCardService.getCardsByCustomerId(this.customerId).subscribe(response => {
        let cards: CreditCard[] = response.data

        let card = cards.find(card => card.cardId == this.selectedCardId);

        if(card.moneyInTheCard < this.paymentAmount)
          return this.toastrService.error("Kartınızda yeterli bakiye yoktur", "Hata")
          
        card.moneyInTheCard = card.moneyInTheCard - this.paymentAmount;
        return this.creditCardService.updateCard(card).subscribe(response => {
          this.toastrService.success("Ödeme yapıldı","Başarılı");
        })

      })
    }
  }

  async getCreditCardByCardNumber(cardNumber:string){
    return (await this.creditCardService.getByCardNumber(cardNumber).toPromise()).data[0];
  }

  updateCard(creditCard:CreditCard){
    this.creditCardService.updateCard(creditCard);
  }

  updateFindexPointOfCurrentCustomer(){
    let currentCustomer = this.localStorageService.getCurrentCustomer();

    this.customerService.getCustomerByEmail(currentCustomer.email).subscribe(response => {
      this.localStorageService.setCurrentCustomer(response.data);
    })
  }

  saveCard(card:CreditCard){
    this.creditCardService.add(card).subscribe(response => {
      this.toastrService.success("Kartınız kaydedildi",response.message);
    },responseError => {
      console.log(responseError);
    })
  }

  selectedCard(creditCard:CreditCard){
    this.selectedCardId = creditCard.cardId;
    this.nameOnTheCard = creditCard.nameOnTheCard;
    this.expirationDate = creditCard.expirationDate;
    this.cardCvv = creditCard.cardCvv;
    this.cardNumber = creditCard.cardNumber;
    this.customerId = creditCard.customerId;
    this.save = false
  }

}
