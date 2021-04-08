import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44384/api/";

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
    }

    register(user:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
      let newPath = this.apiUrl + "auth/register";
      return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
    }
    
    isAuthenticated(){
      if(this.localStorageService.getToken("token")){
        return true;
      }else{
        return false;
      }
    }

    update(customer:Customer):Observable<SingleResponseModel<TokenModel>>{
      let newPath = this.apiUrl+"auth/update";
      return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,customer);
    }
}
