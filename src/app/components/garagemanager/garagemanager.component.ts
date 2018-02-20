import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garagemanager',
  templateUrl: './garagemanager.component.html',
  styleUrls: ['./garagemanager.component.css']
})
export class GaragemanagerComponent implements OnInit {

  constructor(private data:DataService, private router:Router) { }

  reserveringen = [];

  economic = true;
  valet = true;
  long = true;

  kenfirst;
  kensecond;
  kenthird;

  ngOnInit() {
    this.data.getRoles()
      .subscribe(data => {
        
        if(data[0]) {
          let access = false;
          for(let role in data){

            console.log(data[role]);
            if(data[role] == "garagemedewerker"){
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

  submit(){
    console.log(this.economic,this.long,this.valet,this.kenfirst,this.kensecond,this.kenthird);

    let kenteken;

    let types = [];
    if(this.economic) {
      types.push('economic');
    } 
    if (this.long) {
      types.push('long');
    } 
    if (this.valet) {
      types.push('valet');
    }

    if(this.kenfirst == undefined || this.kensecond == undefined || this.kenthird == undefined || this.kenfirst == "" || this.kensecond == "" || this.kenthird == "" ){
      kenteken = "";
    }else {
      kenteken = this.kenfirst + "-" + this.kensecond + "-" + this.kenthird;
    }

    kenteken = kenteken.toUpperCase();

    console.log(kenteken);

    this.data.searchReserveringen(types, kenteken)
      .subscribe(data => {

        console.log(data);
        this.reserveringen = [];

        for(let reservering in data){
          data[reservering].aankomsttijd = this.makeTimeReadAble(data[reservering].aankomsttijd);
          data[reservering].vertrektijd = this.makeTimeReadAble(data[reservering].vertrektijd);
          data[reservering].binnenrijtijd = this.makeTimeReadAble(data[reservering].binnenrijtijd);
          data[reservering].betalingsTijd = this.makeTimeReadAble(data[reservering].betalingsTijd);
          this.reserveringen.push(data[reservering]);
        }
      });
}

  makeTimeReadAble(time) {
    if(time){
      let date = new Date(time);
      return (date.getHours()<10?'0':'') + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()+ " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();     
    }
  }

}
