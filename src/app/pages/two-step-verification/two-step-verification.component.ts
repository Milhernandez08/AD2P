import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute,  Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {
  phone;
  codeBD = 1980;
  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.phone = this.firestore.getUserPhone();
    this.phone = this.phone.toString();
    console.log('phone user: ', this.phone)
    this.firestore.smsVerification(this.phone).subscribe((data) => {
      console.log('code sms sended: ', data)
    }), (err => {
      console.log(err)
    })
  }

  enterCode(form){
    console.log("Datos del formulario", form.value);
    let code = form.value.phone;
    console.log('code: ', code); 
    if (code != this.codeBD ) {
      Swal.fire({
        title: 'Code no match',
        text: 'Enter your code sended to phone',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
    }else {
      this.router.navigate(['/welcome']);
    }
  }

  
}
