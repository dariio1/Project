import { Component, OnInit } from '@angular/core';
import{ApiserviceService} from '../service/apiservice.service'
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {


  constructor(private service : ApiserviceService, private http:HttpClient) {}

  movieDisplay : any = [];

  ngOnInit(): void {
    this.service.movieList().subscribe((result)=>{
      console.log(result);
      this.movieDisplay = result.Search;
    });
    
  }


/*
  getval(event: any)
  {
    this.current = event.target.value;
  }*/
  ////////////////
/*
  current = "";
  getValue(vr : string)
  {
    console.warn(vr);
    this.current = vr;
  }*/
  current = "";
  base = 'http://www.omdbapi.com/?s='
  keyy = '&apikey=a0559ed4'
  pretraga = "";
  movieSrc : any = [];

  getValue(vr : string) : void
  {
    
    console.warn(vr);
    this.current = vr;
    this.pretraga = this.base + this.current + this.keyy;
    //console.log(this.pretraga);
    this.http.get(this.pretraga).subscribe((result)=>{
      console.log(result);
      this.movieSrc = result;
    });
  }

  a = 'http://www.omdbapi.com/?i=';

  getDetails(vr : string){
    this.pretraga = this.a + vr + this.keyy;
    this.http.get(this.pretraga).subscribe((result)=>{
      console.log(result);
  });
}

funkcija(cred){
  this.service.boban(cred).subscribe(
    res => {
      console.log("odeee");

    },
    err => {console.log(err);}
  );
}


}



