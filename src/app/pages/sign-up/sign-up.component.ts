import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {  Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  usuario = {
    'name': '',
    'email': '',
    'phone': '',
    'password': ''
  }
  constructor(
    private firestore: FirebaseService,
    public formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register(form) {
    console.log("Datos del formulario", form.value);
    this.usuario = form.value;
    this.firestore.register(this.usuario).subscribe((data) => {
      console.log("data: ",data)       
      Swal.fire({
        title: 'Resgister success!',
        text: 'Activa tu cuenta al correo proporcionado',
        type: 'success',
        confirmButtonText: 'ok'
      })
      this.router.navigate(['/signin']);
    },(err) => {
      let msg;
      msg =  err.error;  
      console.log(msg);       
      Swal.fire({
        title: 'A ocurrido un error!',
        text: JSON.stringify(msg),
        type: 'warning',
        confirmButtonText: 'ok'
      })
    });
                  
  }

  login() {
    this.router.navigate(['/signin']);
  }

}
