import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ProjectM';

  constructor(private router: Router) { }


  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    this.router.navigate(['login'])
}
}


