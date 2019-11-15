import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute,  Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  dataUser = [];
  idUser;
  emailBD;
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

  enterEmail(form){
    console.log("Datos del formulario", form.value);
    let email = form.value.email;
    console.log('email: ', email);
    console.log('emailBD: ', this.emailBD);
    if( email != this.emailBD) {
      Swal.fire({
        title: 'Email not found',
        text: 'Enter the email with which you registered',
        type: 'warning',
        confirmButtonText: 'Ok'
      })	
    } else {
      this.firestore.resetPassword(email, this.tokenBD).then( res => {
        console.log('Added to email: ', res);
        Swal.fire({
          title: 'Reset password',
          text: 'Check your email',
          type: 'success',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/signin']);
      })
    }
  }

  getUserById(id){    
    this.firestore.getUserById(id).subscribe(result => {     
     this.dataUser = result;
     this.emailBD = result.email;
     this.tokenBD = result.token;
     console.log('user data: ',this.dataUser)
     console.log('email data: ',this.emailBD) 
     console.log('token data: ',this.tokenBD)          
    },(error => {
      console.log('Error, No se encontro: ', error)
    }));
  }
}
