import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  form: FormGroup;

  kenteken = false;
  kentekenError = false;
  submitted = false;

  reserveringEdit = false;

  constructor(private data:DataService, private router:Router, private route: ActivatedRoute, fb:FormBuilder) {
    this.form = fb.group({
      // define your control in you form
        type: ['', Validators.required],
        kenteken: ['', [Validators.maxLength(8), Validators.minLength(4)]],
        date: ['', Validators.required],
        time: ['', Validators.required]
      }); 
      this.onChanges();
  }

  reserveringen;

  ngOnInit() {
    this.getReserveringen();
    this.data.getRoles()
      .subscribe(data => {
        
        if(data[0]){
          let access = false;
          for(let role in data){

            console.log(data[role]);
            if(data[role] == "gebruiker"){
              access = true;
            }
          }

          if(!access){
            this.router.navigate(['/']);
          }
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  getReserveringen() {
    this.data.getReserveringen()
      .subscribe(data => {
        console.log(data);
        this.reserveringen = data;
        for(let reservering of this.reserveringen){
          console.log(reservering);
          reservering.aankomsttijd = this.formatDate(new Date(reservering.aankomsttijd));
          reservering.vertrektijd = this.formatDate(new Date(reservering.vertrektijd));
        }
      });
  }

  nieuweBestelling() {
    this.router.navigate(['/bestelling']);
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  edit(reservering){
    this.reserveringEdit = true;
    console.log(reservering);
  }

  offEdit(){
    this.reserveringEdit = false;
  }

  onChanges(){
    this.form.valueChanges.subscribe(val => {
      console.log(val);
      if(val.type == "valet") {
        if(this.form.get('kenteken').value == ""){
          this.kentekenError = true;
          
        } else {
          console.log("noo");
          this.kentekenError = false;
        }
      } else {
        this.kentekenError = false;
      }
      if(val.type == "valet"){
        this.kenteken = true;
      } else {
        this.kenteken = false;
      }
    });
  }
}
