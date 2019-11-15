import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute,  Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-confirmation-reset-password',
  templateUrl: './confirmation-reset-password.component.html',
  styleUrls: ['./confirmation-reset-password.component.css']
})
export class ConfirmationResetPasswordComponent implements OnInit {
  dataUser = [];
  idUser;
  passwordBD;
  tokenBD;
  
  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idUser = this.firestore.getUserId(); 
    this.getUserById(this.idUser);  
  }

  enterPassword(form){
    console.log("Datos del formulario", form.value);
    let password = form.value.password;
    let password1 = form.value.password1;    
    console.log('password: ', password);
    console.log('password1: ', password1);
    if( password != password1) {
      Swal.fire({
        title: 'Password not match',
        text: 'try again',
        type: 'error',
        confirmButtonText: 'Ok'
      })	
    } else {
    let newPassword = password1
    this.dataUser["password"] = newPassword;
    console.log("actualizado", this.dataUser["password"])    
    console.log('id user update: ', this.idUser)
    this.firestore.updateUserPassword(this.idUser, this.dataUser).then( res => {
          console.log('update password succes', res);
          Swal.fire({
            title: 'Updated password',
            text: 'Success',
            type: 'success',
            confirmButtonText: 'Ok'
          })	
          this.router.navigate(['/signin']);
      }
    ),(err => {
      console.log('Error-> ', err)
    })
    }  
  }

  getUserById(id){    
    this.firestore.getUserById(id).subscribe(result => {     
     this.dataUser = result;
     console.log('user data: ',this.dataUser)     
  
    },(error => {
      console.log('Error, No se encontro: ', error)
    }));
  }

}
