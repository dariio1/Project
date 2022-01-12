import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';
import { FavoriteserviceService } from '../service/favoriteservice.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styles: [
  ]
})
export class MovieDetailComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,
              private _Apiservice: ApiserviceService,
              private service: FavoriteserviceService) { }
sub;
id;
imdb: any;
details: any = []
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.id = params.get('id');       });
    this. _Apiservice.getDetails(this.id).subscribe((result)=>{
        console.log(result);
        this.details = result; 
  });

}
getId(){
    this._Apiservice.getByImdb(this.id).subscribe((res)=>{
      console.log(res);
      this.imdb = res;
      //console.log(typeof(this.imdb))
      return this.imdb;
    })
}
idd : any;
var: number;
get(){
  let token = localStorage.getItem('jwt');
  let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
  this.idd = decodedJWT.id; 
}
akcija(){
  this.getId();
  this.get();
  console.log(this.idd); 
  console.log("id: " + typeof(this.idd))
  console.log("imdb: " + typeof(this.imdb)) 
  console.log(this.imdb);
    this.service.addFavorite(this.idd, this.imdb).subscribe(data =>{
      console.log(data)
    },error => {
      console.log(error);
    })
  }
}



