import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-uitrijden',
  templateUrl: './uitrijden.component.html',
  styleUrls: ['./uitrijden.component.css']
})
export class UitrijdenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private data:DataService) { }

  userId;
  id;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userId = params['userId'];
    });

    this.data.uitrijden(this.userId, this.id)
      .subscribe(data => {
        console.log(data);
        if(data[0]){

        }
        
      })
  }

}
