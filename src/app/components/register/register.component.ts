import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  // BEZIG MET DE REGISTRETIE FORM GOED MAKEN

  constructor(private route: ActivatedRoute, private data:DataService, fb:FormBuilder) {
    this.form = fb.group({
      // define your control in you form
        achternaam: ['', Validators.required],
        email: ['', Validators.required],
        nummer: ['', Validators.required],
        rekening: ['', Validators.required]
      }); 
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form.value);

    this.data.Register(form.value.achternaam, form.value.email, form.value.nummer, form.value.rekening);
  }

}
