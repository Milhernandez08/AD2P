import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {  Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  constructor(
    private firestore: FirebaseService,
    public formBuilder: FormBuilder,    
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(form) {
    var userExists;
    console.log("Datos del formulario", form.value);
    var email = form.value.email;
    if(!email || !email) {
      Swal.fire({
        title: 'A ocurrido un error!',
        text: 'Please enter email/password.',
        type: 'warning',
        confirmButtonText: 'Ok'
      })	
    }
    else {
      console.log(form.value.email)
      var password = form.value.password;  
    
      this.firestore.login(email).subscribe(snapshot => {
        userExists = snapshot.size;
  			
        if(snapshot.size == 0){
          console.log('Invalid account ')
          Swal.fire({
            title: 'A ocurrido un error!',
            text: 'Invalid account',
            type: 'error',
            confirmButtonText: 'Ok'
          })			
        }
      
        snapshot.forEach( doc => {
          console.log(doc.id, " => ", doc.data());
          this.firestore.setUserId(doc.id);
          var userPass = doc.data().password;         
  
          if(userPass && password === userPass){					
  					console.log('data user in login: ', doc.data());
            let status = doc.data().active;
            let sms = doc.data().sms;
            let phone = doc.data().phone;
            this.firestore.setUserPhone(phone);
            console.log('status: ', status)
            console.log('sms: ', sms)

            this.validarStatus(status, sms);

  				}else{
            console.log('invalid pass/email')
            Swal.fire({
              title: 'A ocurrido un error!',
              text: 'Invalid email/password.',
              type: 'warning',
              confirmButtonText: 'Ok'
            })					
  				}
        });
      }),(error => {
          console.log("Error getting documents: ", error);
      });
    }
    
  }
  
  public validarStatus(status, sms){
    if(status === true) {
        if (sms === true) {
          this.router.navigate(['/sms-verification']);
        } else {
          this.router.navigate(['/welcome']);
        }                
    } else {
      Swal.fire({
        title: 'Your account is not activated',
        text: 'Activate your account in your email provided',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
    }
  }
       

}
