import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-movies-db',
  templateUrl: './movies-db.component.html',
  styles: [
  ]
})
export class MoviesDbComponent implements OnInit {

  constructor(private service : ApiserviceService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.pocetna()
  }

  list : any[];

  pocetna(){
    this.service.getMovies().subscribe(data =>{
      console.log(data)
      this.list = data;
    },error => {
      console.log(error);
    })
  }

  brisi(id){
    this.service.deleteMovie(id).subscribe(data =>{
      this.toastr.error('Movie deleted', 'Delete');
      this.pocetna();
    },error =>{
        console.log(error);
      })
  }
}
