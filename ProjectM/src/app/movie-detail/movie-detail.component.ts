import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
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
              private service: FavoriteserviceService, 
              private jwtHelper : JwtHelperService,
              private toastr:ToastrService) { }
sub;
id: any;
imdb: number;
details: any = []
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
     // console.log(params);
      this.id = params.get('id');       });
    this. _Apiservice.getDetails(this.id).subscribe((result)=>{
        //console.log(result);
        this.details = result; 
        
  });
this.getId();

}
getId(){
    this._Apiservice.getByImdb(this.id).subscribe((res)=>{
      console.log(res);
      this.imdb = Number(res.id);
      //console.log(typeof(this.imdb))
    })
}
idd : number;
var: number;
get(){
  let token = localStorage.getItem('jwt');
  let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
  this.idd = Number(decodedJWT.id); 
}
akcija(){
  //this.getId();
  this.get();
  console.log(this.idd); 
  console.log("id: " + typeof(this.idd))
  console.log(this.imdb);
  console.log("imdb: " + typeof(this.imdb)) 
    this.service.addFavorite(this.idd, this.imdb).subscribe(data =>{
      console.log("proslo")
      this.toastr.success('Film uspješno dodan u favorite', 'Uspjeh!')
    },error => {
      console.log(error);
      this.toastr.warning('Film je već dodan u favorite', 'Upozorenje!')
    })
  }
}



