import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-bestelling',
  templateUrl: './bestelling.component.html',
  styleUrls: ['./bestelling.component.css']
})
export class BestellingComponent implements OnInit {

  form: FormGroup;

  kenteken = false;
  kentekenError = false;
  submitted = false;

  constructor(private route: ActivatedRoute, private data:DataService, fb: FormBuilder) { 
    this.form = fb.group({
      // define your control in you form
        type: ['', Validators.required],
        kenteken: ['', [Validators.maxLength(8), Validators.minLength(4)]],
        date: ['', Validators.required],
        time: ['', Validators.required]
      }); 
      this.onChanges();
      this.submitted = false;
  }

  ngOnInit() {
  }

  onSubmit({ value, valid }) {
    this.submitted = true;
    if(this.form.get('type').value == "valet") {
      if(valid && this.form.get('kenteken').value != ""){
        this.submit(value);
      }
    } else {
      console.log(value, valid);
      if(valid) {
        this.submit(value);
      }
    }
  }

  submit(value){
    console.log(value);
    this.data.nieuweBestelling(value);
  }

  onChanges(){
    this.form.valueChanges.subscribe(val => {
      if(this.form.get('type').value == "valet") {
        if(this.form.get('kenteken').value == ""){
          this.kentekenError = true;
          
        } else {
          this.kentekenError = false;
        }
      }
      if(val.type == "valet"){
        this.kenteken = true;
      } else {
        this.kenteken = false;
      }
    });
  }
}
