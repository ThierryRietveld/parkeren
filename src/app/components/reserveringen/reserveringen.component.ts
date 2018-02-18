import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  constructor(private data:DataService, private router:Router) { }

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
}
