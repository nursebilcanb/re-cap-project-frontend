import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {


  colorDeleteForm:FormGroup;
  colors:Color[];
  dataLoaded =false;

  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColorList();
  }

  getColorList(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data ;
      this.dataLoaded = true;
    })
  }

  delete(color:Color){
      this.colorService.delete(color).subscribe(response => {
      this.toastrService.success('Renk silindi','Başarılı') 
      }
      ,responseError => {
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama Hatası');
          }
        }
      })
   
  }
}
