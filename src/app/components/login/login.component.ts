import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private data:DataService, private router:Router) { }

  username:string;
  password:string;

  ngOnInit() {
  }

  Login() {
    // Hier gebleven, verdergaan met token en id opslaan in localstorage en routen naar reserveringComponent
    this.data.Login(this.username, this.password)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem("userId", data[0].id);
        localStorage.setItem("userToken", data[0].token);
        this.router.navigate(['/reserveringen']);
      });
  }

}
