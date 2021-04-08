import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.localStorageService.removeToken("token");
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.success("Çıkış yapıldı","Başarılı");
    return this.router.navigateByUrl("/login");
  }

  getCurrentCustomer():Customer{
    return this.localStorageService.getCurrentCustomer();
  }

}
