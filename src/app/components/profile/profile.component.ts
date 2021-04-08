import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer:Customer;
  customerUpdateForm:FormGroup;

  imageUrl = "https://localhost:44384/Images/"
  defaultImage="logo.jpg";

  constructor(private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer(){
    this.customer = this.localStorageService.getCurrentCustomer();
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      customerId:[this.customer.customerId,Validators.required],
      userId:[this.customer.userId,Validators.required],
      firstName:[this.customer.firstName,Validators.required],
      lastName:[this.customer.lastName,Validators.required],
      companyName:[this.customer.companyName,Validators.required],
      email:[this.customer.email,Validators.required],
      findexPoint:[this.customer.findexPoint,Validators.required],
      password:[""],
      confirmPassword:[""]
    })
  }

  update(){
    if(this.customerUpdateForm.invalid){
      this.toastrService.error("Bütün alanları doldurduğunuzdan emin olun","Hata");
      return;
    }

    if(this.customerUpdateForm.value["password"] != this.customerUpdateForm.value["confirmPassword"]){
      this.toastrService.error("Şifreler birbiriyle eşleşmiyor","Hata");
      return;
    }

    delete this.customerUpdateForm.value["confirmPassword"];

    let customerModel:Customer = Object.assign({},this.customerUpdateForm.value);
    console.log(customerModel);
    this.authService.update(customerModel).subscribe(response => {
      this.localStorageService.removeCurrentCustomer();
      delete customerModel.password;
      this.localStorageService.setCurrentCustomer(customerModel);

      
      return this.toastrService.success("Bilgileriniz güncellendi","Başarılı");
    },responseError => {
      if(responseError.error.ValidationErrors){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
        }
        return;
      }
      this.toastrService.error(responseError.error.StatusCode + " " + responseError.error.Message, responseError.name)
    });
  }

}
