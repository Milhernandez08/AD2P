import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId;
  userToken;
  userPhone;
  public ENDPOINT = 'https://us-central1-ad2p-40632.cloudfunctions.net/';
  private URL_API = this.ENDPOINT + 'webapi/api/v1/';

  constructor(private firestore: AngularFirestore,  public http: HttpClient ) {}
  
  smsVerification(phone):  Observable<any>{
    var ruta = this.URL_API+'sms';
    console.log("Ruta sms: ", ruta, phone);

    return this.http.post(ruta, {"phone" : phone});
  }

  register(usuario):  Observable<any>{
    var ruta = this.URL_API+'register';
    console.log("Ruta register: ", ruta, usuario);

    return this.http.post(ruta, usuario, this.getAuthorization());
  }

  login(email) {    
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).get();    
  }
 
  searchUsersBytoken(value){
    console.log('token-> ', value)
    return this.firestore.collection('users', ref => ref.where('token', '==', value)).get();    
  }

  updateUser(userKey, value){
    console.log('value service->', value)    
    return this.firestore.collection('users').doc(userKey).set(value);
  }
  
  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
  
  getUserById(id:string): Observable<any>{
    return this.firestore.collection('users').doc(id).valueChanges();
  }

  resetPassword(email, token){
    return this.firestore.collection('emails').add({
      email: email,
      token: token, 
    });
  }
  

  updateUserPassword(userKey, value){
    console.log('value to update: ', value)    
    return this.firestore.collection('users').doc(userKey).set(value);
  }


  activateSms(userKey, value){
    console.log('value to update: ', value)    
    return this.firestore.collection('users').doc(userKey).set(value);
  }

  /* Setters and Getters */
  setUserPhone(userPhone:number){
    this.userPhone = userPhone;
    localStorage.setItem('userPhone',JSON.stringify(userPhone));
  }

  getUserPhone(){
    return JSON.parse(localStorage.getItem('userPhone'));
  }
  setUserId(userId:string){
    this.userId = userId;
    localStorage.setItem('userId',JSON.stringify(userId));
  }

  getUserId(){
    return JSON.parse(localStorage.getItem('userId'));
  }



  /* Metodos */
  getAuthorization(){    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,UPDATE,DELETE,PUT',
        'Accept' : 'application/json',
        'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
      })
    }
    return httpOptions;
  }

  /* USERS 
  register(usuario){
    return this.firestore.collection('users').add(usuario);
    */
}
  

