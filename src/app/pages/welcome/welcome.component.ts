import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute,  Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  idUser; 
  nameUser;
  phoneUser;
  mailUser;
  dataUser = [];
  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {  
    this.getUserById();
  }
  
  getUserById(){
    this.idUser = this.firestore.getUserId();
    console.log('user id: ',this.idUser) 
    this.firestore.getUserById(this.idUser).subscribe(result => {     
     this.dataUser = result;
     this.nameUser = this.dataUser["name"]
     this.mailUser = this.dataUser["email"]
     this.phoneUser = this.dataUser["phone"]
     console.log('user data: ',this.dataUser)   
     console.log('user data: ',this.nameUser)      
    },(error => {
      console.log('Error, No se encontro: ', error)
    }));
  }
  sms(){
    this.dataUser["sms"] = true;
    this.firestore.activateSms(this.idUser, this.dataUser).then( res => {
      console.log('sms activated: ', res);
      Swal.fire({
        title: 'Two step verification',
        text: 'two step verification is activated',
        type: 'success',
        confirmButtonText: 'Ok'
      })
      
    })
  }
  login() {
    this.router.navigate(['/signin']);
  }
}
