import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteserviceService {

  constructor(private http:HttpClient) { }


  getFavorites(id : number) : Observable<any>{
    return this.http.get("https://localhost:44384/api/Favorite/get_user_movies/" + id);
  }

  addFavorite(id: number, idm: number) : Observable<any>{
    return this.http.put("https://localhost:44384/api/Favorite/add_favorite/" + id, idm);
  }

}