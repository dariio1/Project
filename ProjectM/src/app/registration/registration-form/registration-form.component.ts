import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
              private toastr:ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.postRegister().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Uspjesno ste se registrirali!', 'Success!')
        this.router.navigate(['/'])

      },
      err => {console.log(err);
        this.toastr.error("Korisničko ime je zauzeto", 'Greška!');
        }
    );
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Registration();
  }

}
