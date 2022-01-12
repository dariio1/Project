import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { FavoriteserviceService } from '../service/favoriteservice.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ]
})
export class FavoritesComponent implements OnInit {

  constructor(public _service: FavoriteserviceService,
              public service: ApiserviceService) { }

  ngOnInit(): void {
    
  }
list: any[];
lista: any[];
poster: any[];
prva(){
  let token = localStorage.getItem('jwt');
  let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
  var id = decodedJWT.id;
  console.log(id)
  this._service.getFavorites(id).subscribe(data =>{
    console.log(data)
    this.list = data.imdbId;
    //this.poster = data.poster;
    // var results = [ ...this.list, ...this.poster];
    //console.log(this.list)
  },error => {
    console.log(error);

  });
}
getById(){
  //this.prva();
  this.list.forEach(element => {
    this.service.getById(element).subscribe(data =>{
      console.log(data);
      this.lista = data;
    },error => {
      console.log(error);
    })
  });

}
funkc(){
  console.log(this.list)
}

}
