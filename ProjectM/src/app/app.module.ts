import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import{JwtModule} from '@auth0/angular-jwt';



import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { MovielistComponent } from './movielist/movielist.component';
import{ApiserviceService} from './service/apiservice.service';
import { UserListComponent } from './user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { GuardComponent } from './guard/guard.component';
import { MoviesDbComponent } from './movies-db/movies-db.component';
import { FavoritesComponent } from './favorites/favorites.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RegistrationFormComponent,
    MovielistComponent,
    UserListComponent,
    MovieDetailComponent,
    LoginComponent,
    MoviesDbComponent,
    FavoritesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbPaginationModule, NgbAlertModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'ap', component: AppComponent},
      {path: 'login', component: LoginComponent}
    ]), 
    JwtModule.forRoot({
      config:{
        tokenGetter : tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [ApiserviceService,
              GuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
