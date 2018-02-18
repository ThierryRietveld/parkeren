import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-binnenrijden',
  templateUrl: './binnenrijden.component.html',
  styleUrls: ['./binnenrijden.component.css']
})
export class BinnenrijdenComponent implements OnInit {

  constructor(private route:ActivatedRoute, private data:DataService) { }

  id;
  userId;
  email;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userId = params['userId'];
      this.email = params['email'];
    });

    this.data.binnenrijden(this.userId, this.id)
      .subscribe(data => {
        console.log(data);
        if(data[0]){

        }
        
      })
  }

}
