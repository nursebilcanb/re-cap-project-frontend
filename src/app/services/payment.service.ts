import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44384/api/";

  constructor(private httpClient:HttpClient) { }

  pay(rental:Rental,amount:number){
    let path = this.apiUrl + "rentals/paymentadd";//paymentadd yok(Melih'de de yok)
    //rental.returnDate = undefined;
    this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental})
  }
}
