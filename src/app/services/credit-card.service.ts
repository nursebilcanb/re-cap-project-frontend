import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = "https://localhost:44384/api/";

  constructor(private httpClient:HttpClient) { }

  verifyCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/verifycard";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getByCardNumber(cardNumber:string):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"creditcards/getbycardnumber?cardNumber="+cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCard(creditCard:CreditCard){
    let newPath = this.apiUrl+"creditcards/update";
    this.httpClient.put(newPath,creditCard);//neden httpClient.post() kullanmadık?
  }
}
