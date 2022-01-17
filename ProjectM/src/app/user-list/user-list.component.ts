import { Component, OnInit, Type } from '@angular/core';
import { RegistrationService } from 'src/app/shared/registration.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})

export class UserListComponent implements OnInit {

editForm : FormGroup;

  constructor(public service : RegistrationService,
              private toastr:ToastrService,
              private _modalService: NgbModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.funkcija();
    this.editForm = this.fb.group({
      username: [''],
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      role: ['']
    } );
    
  }
  list: any[];
 
  funkcija(){
    this.service.getUsers().subscribe(data =>{
      console.log(data)
      this.list = data ;
    },error => {
      console.log(error);
    })
  }

  oneUser(id : number){
    this.service.getOne(id).subscribe(data =>{
      console.log(data.id)
    },error => {
      console.log(error);
    })
  }

  onDelete(id : number){
    this.service.deleteUser(id).subscribe(data =>{
      this.toastr.error('User deleted', 'Deleted');
      this.funkcija();
    },error =>{
      console.log(error);
    })
  }


deleteId : number;
openDelete(targetModal,  user) {
  this.oneUser(user.id);
  this.deleteId = user.id;
  this._modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
krc(){
  this.service.deleteUser(this.deleteId).subscribe(data =>{
    this.toastr.error('Korisnik je izbrisan', 'Deleted');
    this.funkcija();
    this._modalService.dismissAll();
  },error =>{
      console.log(error);
      this.toastr.warning('Zabranjen pristup', 'Upozorenje');
    })
}
ID : number;
openEdit(targetModal, user) {
  this.ID = user.id;
  this._modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
   
 });
 this.editForm.patchValue({ 
  username: user.username,
  name: user.name,
  lastname: user.lastname,
  email: user.email,
  password: user.password,
  role: user.role,
});
}

realEdit(){
  this.service.postEdit(this.ID, this.editForm.value).subscribe(data => {
    this.toastr.warning('Promjene su spremljene', 'Edited');
    this.funkcija();
    this._modalService.dismissAll();
  },error =>{
      console.log(error);
      this.toastr.warning('Zabranjen pristup', 'Upozorenje');
    })
  };    





logout(){
    localStorage.removeItem("jwt");
}
pokusaj(){
let token = localStorage.getItem('jwt');
let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

console.log('name: ' + decodedJWT.username);
console.log('id: ' + decodedJWT.id);
}


}



/*
  closeResult = '';
  open(content) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
}*/