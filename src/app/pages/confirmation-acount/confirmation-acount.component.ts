import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute,  Router } from '@angular/router';
@Component({
  selector: 'app-confirmation-acount',
  templateUrl: './confirmation-acount.component.html',
  styleUrls: ['./confirmation-acount.component.css']
})
export class ConfirmationAcountComponent implements OnInit {
  tokenUser; 
  idUser; 
  dataUser = [];
  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tokenUser = this.route.snapshot.params.token;
    console.log("token: ", this.tokenUser)
    this.getUser();    
  }

  getUser(){
    this.tokenUser = this.route.snapshot.params.token;    
    this.firestore.searchUsersBytoken(this.tokenUser).subscribe(queriedItems => {
      console.log("Query: ", queriedItems)     
      this.idUser = queriedItems.docs[0]["id"];
      console.log("user data token -> ", queriedItems)      
      console.log("user id  -> ", this.idUser)
      this.firestore.setUserId(this.idUser);
      this.getUserById(this.idUser);      
    },(error => {
      console.log('Error, No se encontro: ', error)
    }));
  
  } 
  

  getUserById(id){    
    this.firestore.getUserById(id).subscribe(result => {     
     this.dataUser = result;
     console.log('user data: ',this.dataUser)     
     this.activateUser();
    },(error => {
      console.log('Error, No se encontro: ', error)
    }));
  }

  activateUser(){       
    this.dataUser["active"] = true;
    console.log("actualizado", this.dataUser["active"])    
    console.log('id user update: ', this.idUser)
    this.firestore.updateUser(this.idUser, this.dataUser).then( res => {
          console.log('Status->', res);
          this.router.navigate(['/welcome']);
      }
    ),(err => {
      console.log('Error-> ', err)
    })
  }
   
}
