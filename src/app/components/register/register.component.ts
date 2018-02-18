import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private data:DataService) { }

  achternaam:string;
  email:string;
  nummer:string;
  rekening:string;

  ngOnInit() {
  }

  Register() {
    this.data.Register(this.achternaam, this.email, this.nummer, this.rekening);
  }

}
