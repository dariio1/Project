import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Registration } from 'src/app/shared/registration.model';
import { RegistrationService } from 'src/app/shared/registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styles: [
  ]
})
export class RegistrationFormComponent implements OnInit {

  constructor(public service:RegistrationService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.postRegister().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Uspjesno ste se registrirali!', 'Success!')

      },
      err => {console.log(err);}
    );
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Registration();
  }

}
