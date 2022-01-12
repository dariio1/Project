import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  //apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=a0559ed4";
  apiUrl = "http://www.omdbapi.com/?i=tt0121765&apikey=a0559ed4";
  //apiUrl = "https://api.themoviedb.org/3/movie/550?api_key=9b6303ae4ef20299a96edb99eae60300"
  baza = 'https://api.themoviedb.org/3';
  //key = 'api_key=9b6303ae4ef20299a96edb99eae60300';
  //url = this.baza + '/discover/movie?sort_by=popularity.desc&' + this.key;

  movieList() : Observable<any> 
  {
    return this.http.get(this.apiUrl)
  }

  a = 'http://www.omdbapi.com/?i=';
  pretraga = "";
  keyy = '&apikey=a0559ed4'
  
  getDetails(vr : string) : Observable<any> {
    this.pretraga = this.a + vr + this.keyy;
    return this.http.get(this.pretraga)

  }

  boban(credent : any[]) : Observable<any>{
    return this.http.post("https://localhost:44384/api/Class/ad", credent);
  }

  getMovies() : Observable<any>{
    return this.http.get("https://localhost:44384/api/Class/get_all")
  }

  deleteMovie(id : number) : Observable<any>{
    return this.http.delete("https://localhost:44384/api/Class/delete/" + id)
  }
  getById(id : number) : Observable<any>{
    return this.http.get("https://localhost:44384/api/Class/get_by_id/" + id)
  }
  getByImdb(id : string) : Observable<any>{
    return this.http.get("https://localhost:44384/api/Class/get_by_imdb/" + id)
  }

}


  /*
    getval(event: any)
    {
      this.current = event.target.value;
    }*/




