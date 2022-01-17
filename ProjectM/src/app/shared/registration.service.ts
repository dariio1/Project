import { Injectable } from '@angular/core';
import { Registration } from './registration.model';
import{HttpClient, HttpHeaders} from "@angular/common/http";
import { interval, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient,) { }

  formData: Registration = new Registration();
  list: Registration[];

  readonly Base = 'https://localhost:44384/api/User/'

  postRegister(){
    return this.http.post(this.Base + "add", this.formData);
  }

  getUsers() : Observable<any>{
    let httpOptions = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"));
    return this.http.get(this.Base + "get_all", { headers: httpOptions })
  }
  
  getOne(id : number) : Observable<any>{
    return this.http.get(this.Base + "get_one_by_Id/" + id)
  }

  deleteUser(id : number) : Observable<any>{
    let httpOptions = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"));
    return this.http.delete(this.Base + "delete/" + id, { headers: httpOptions })
  }

  postEdit(id : number, user: any) : Observable<any>{
    let httpOptions = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"));
    return this.http.put(this.Base + "edit_user/" + id, user, { headers: httpOptions });
  }

  login(user:any) : Observable<any>{
    return this.http.post(this.Base + "authenticate", user);
  }
}




//2
/*  getUsers(){
    this.http.get(this.Base + "get_all").subscribe(  
      data => {  
      this.list = data as Registration [];
  });
}*/
//3
/*  getUsers(){
    lastValueFrom(this.http.get(this.Base + "get_all"))
    //.toPromise()
    .then(res => this.list = res as Registration[])
  }*/