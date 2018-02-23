import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baliemedewerker',
  templateUrl: './baliemedewerker.component.html',
  styleUrls: ['./baliemedewerker.component.css']
})
export class BaliemedewerkerComponent implements OnInit {

  constructor(private data:DataService, private router:Router) { }

  ngOnInit() {
    this.data.getRoles()
      .subscribe(data => {
        
        if(data[0]) {
          let access = false;
          for(let role in data){

            console.log(data[role]);
            if(data[role] == "baliemedewerker"){
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

}
