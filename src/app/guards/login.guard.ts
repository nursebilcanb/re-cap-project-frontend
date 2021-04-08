import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private authService:AuthService,private router:Router,
    private toastrService:ToastrService){

    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated()){
        return true;
      }else{
        this.router.navigateByUrl("/login");
        this.toastrService.info("Sisteme giriş yapmalısınız");
        return false;
      }
  }
  
}
