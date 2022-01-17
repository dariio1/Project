import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../service/apiservice.service';
import { FavoriteserviceService } from '../service/favoriteservice.service';
import { Moja } from '../shared/favorite.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ]
})
export class FavoritesComponent implements OnInit {

  constructor(public _service: FavoriteserviceService,
              public service: ApiserviceService,
              private toastr : ToastrService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.prva();
    
  }
list: any[];
lista: any[];
id: number;
empList: Array<Moja> = [];
//empList: Array<{title: string, poster: string, imdb: string}> = []; 
prva(){
  let token = localStorage.getItem('jwt');
  let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
  this.id = Number(decodedJWT.id);
  //console.log(this.id)
  this._service.getFavorites(this.id).subscribe(data1 =>{
    //console.log(data1)
    this.list = data1.movieIDs;
      this.list.forEach((element, index) => {
    this.service.getById(element).subscribe(data =>{
      //console.log(data);
      let novo = new Moja();
      novo.aa = data1.idd[index];
      novo.id = data.id;
      novo.title = data.title;
      novo.poster = data.poster; 
      novo.imdb = data.imdbId;
      this.empList.push(novo);
      //console.log("Aa" + this.empList);
       },error => {
        console.log(error);
      })
    });
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
getBy(id){
  //this.prva();
    this.service.getById(id).subscribe(data =>{
      console.log(data);
      this.lista = data;
    },error => {
      console.log(error);
    })

}
varijabla : number;
delete(idm : number){
  console.log(this.id)
  console.log(idm)
  console.log("idm: " + typeof(this.id))
  this._service.removeFavorite(idm).subscribe(data =>{
    this.toastr.error('Film je uklonjen iz favorita', 'Deleted');
    this.prva();
    location.reload();
  },error => {
    console.log(error);

})
}
funkcija(a){
  console.log(a);
  location.reload();
}

}
