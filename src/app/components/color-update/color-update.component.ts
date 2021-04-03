import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,private colorService:ColorService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.getByColorId(params["colorId"]);
      })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(colorId).subscribe(response => {
      this.color = response.data[0];
      this.createColorUpdateForm();
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.color.colorId,Validators.required],
      colorName:[this.color.colorName,Validators.required]
    })
  }
  

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)

      this.colorService.update(colorModel).subscribe(response => {
      this.toastrService.success('Renk güncellendi','Başarılı') 
      },responseError => {
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama Hatası');
          }
        }
      })
    }else{
      this.toastrService.error('Formunuz eksik','Dikkat')
    }
  }

}
