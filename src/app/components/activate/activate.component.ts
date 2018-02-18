import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private data:DataService, fb: FormBuilder) {
    this.form = fb.group({
      // define your control in you form
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
      })
   }

  id;
  token;

  password;
  password1;
  confirmPassword;

  activated = false;
  msg = "U bent al geactiveerd";

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.token = params['token'];
    });

    this.data.GetUser(this.id, this.token)
      .subscribe(data => {
        console.log(data);
        if(data[0]){
          if(data[0].activatie == "1") {
            this.activated = true;
          }
        }
        
      });
  }

  Activate(value){
    console.log(value);
    if(value.password == value.confirmPassword){
      this.data.Activate(value.password, this.id, this.token)
        .subscribe(data => {
          if(data[0]){
            this.activated = true;
          }
        });
    }
  }

}

class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
     let password = AC.get('password').value; // to get value in input tag
     let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if(password != confirmPassword) {
          console.log('false');
          AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
          console.log('true');
          return null
      }
  }
}