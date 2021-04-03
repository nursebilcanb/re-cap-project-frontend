import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brandDeleteForm: FormGroup;

  // selectedBrand:Brand;

  brands: Brand[];
  brand: Brand;
  dataLoaded = false;

  constructor(private brandService: BrandService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.dataLoaded = true;
    })
  }

  // setSelectedBrandToDelete(brand: Brand){
  //   this.selectedBrand = brand;
  //   this.delete();
  // }

 
  delete(brand:Brand) {
    this.brandService.delete(brand).subscribe(response => {
      this.toastrService.success('Marka silindi', 'Başarılı')
    }, responseError => {
      if (responseError.error.ValidationErrors.length > 0) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası');
        }
      }
    }
    )
  }
}
