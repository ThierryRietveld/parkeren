import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-betaal',
  templateUrl: './betaal.component.html',
  styleUrls: ['./betaal.component.css']
})
export class BetaalComponent implements OnInit {

  constructor(private data:DataService, private route:ActivatedRoute) { }

  userId;
  bestellingId;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bestellingId = params['bestellingId'];
      this.userId = params['userId'];
    });
  }

  betaal(){
    this.data.betaal(this.userId, this.bestellingId)
      .subscribe(data => console.log(data));
  }

}
