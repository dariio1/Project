import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../shared/registration.service';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public service : RegistrationService,
              private router: Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  token : any[];
  invalidLogin : boolean;


  login(form : NgForm)
  {
    const credentials = {
      'username' : form.value.username,
      'password' : form.value.password
    }

    this.service.login(credentials).subscribe(response => {
      //this.token = response.jwt_Token;
      this.toastr.success('Uspjesno ste se prijavili!', 'Success!')
      const tk = response.jwt_Token;
      //const id = response.id;
      console.log(response);
      localStorage.setItem("jwt", tk);
      //localStorage.setItem("id", id);
      this.invalidLogin = false;
      this.router.navigate(['/'])
      
    },err => {
      this.invalidLogin = true;
    
    })
  }
}


