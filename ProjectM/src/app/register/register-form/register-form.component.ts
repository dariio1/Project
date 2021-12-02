import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
})
export class RegisterFormComponent implements OnInit {

  constructor(public service:RegisterService) { }

  ngOnInit(): void {
  }

}
