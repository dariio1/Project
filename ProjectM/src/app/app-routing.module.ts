import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovielistComponent } from './movielist/movielist.component';
import { RegistrationComponent } from './registration/registration.component';
import{UserListComponent} from './user-list/user-list.component'
import{MovieDetailComponent}from './movie-detail/movie-detail.component'
import { LoginComponent } from './login/login.component';
import { GuardComponent } from './guard/guard.component';
import { MoviesDbComponent } from './movies-db/movies-db.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'movielist', component: MovielistComponent, canActivate : [GuardComponent] },
  { path: 'userlist', component: UserListComponent},
  { path: 'moviedetail/:id', component: MovieDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'movies', component: MoviesDbComponent},
  { path: 'favorit', component: FavoritesComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
