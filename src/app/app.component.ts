import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from './data.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerTitle = "Lelystad Airport Parkeer";

  navbar = [];

  navbarStandard = [
    { location: '/', text: 'Contact'}
  ];

  navbarNotLoggedin = [
    { location: '/register', text: 'Registreren', icon:''},
    { location: '/login', text: 'Login' }
  ];

  navbarLoggedin = [
    { location: '/reserveringen', text: 'Reserveren', icon:''}
  ]

  navbarGaragemedewerker = [
    { location: '/garagemanager', text: 'Garagemaneger', icon:''},
  ]

  navbarBeheerder = [
    { location: '/admin', text: 'Admin page', icon:''},
  ]

  navbarBalie = [
    { location: '/balie', text: 'Balie', icon:''},
  ]

  navbarVisible = false;
  private _routerSub = Subscription.EMPTY;

  constructor(private router: Router, private data:DataService) {
    
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((value) => {

      this.navbarVisible = false;

      // Changes the header title and the buttons on the router change

      // The var navbar is an array with objects in it
      // The objects in it are the buttons on screen
      // You can set the text of the button and the route
      // Text for text and location for route
      // [{location: '/login', text: 'Login button'}, etc...]

      // this.data.getRoles()
      //   .subscribe(data => {
      //     if(){

      //     }
      //   });
      
      
      console.log("ddd");
      this.data.getRoles()
        .subscribe(data => {
          this.navbar = [];

          for(let bar of this.navbarStandard){
            this.navbar.push(bar);
          }
          console.log(data);
          if(data[0]){

            for(let role in data){
    
              console.log(data[role]);
              if(data[role] == "garagemedewerker"){
                for(let bar of this.navbarGaragemedewerker){
                  this.navbar.push(bar);
                }
              } else if(data[role] == "baliemedewerker"){
                for(let bar of this.navbarBalie){
                  this.navbar.push(bar);
                }
              } else if(data[role] == "beheerder"){
                for(let bar of this.navbarBeheerder){
                  this.navbar.push(bar);
                }
              } else if(data[role] == "gebruiker"){
                for(let bar of this.navbarLoggedin){
                  this.navbar.push(bar);
                }
              }
            }
          } else {
            for(let bar of this.navbarNotLoggedin){
              this.navbar.push(bar);
            }
          }
        });

      

      var route = value['urlAfterRedirects'];

      if(route != undefined){
        if (route == "/register") {
          this.headerTitle = "Registreren";
        } else if (route == "/betalen") {
          this.headerTitle = "Betalen";
        } else if (route == "/autos") {
          this.headerTitle = "Overzicht Auto's";
        } else if (route == "/") {
          this.headerTitle = "Lelystad Airport Parkeer";
        } else if (route == "/login") {
          this.headerTitle = "Login";
        } else if (String(route).includes('/activate')) {
          this.headerTitle = "Activeren";
        } else if (route == '/reserveringen') {
          this.headerTitle = "Reserveringen";
        } else if (route == '/bestelling') {
          this.headerTitle = "Nieuwe bestelling";
        }  else if (route == '/garagemanager') {
          this.headerTitle = "Garagemanager";
        } else if (String(route).includes('/betalen')) {
          this.headerTitle = "Betalen";
        } else {
          this.headerTitle = "";
        }
      }
    });
  }

  execute(func){
    eval("func");
  }

  boii(){
    console.log("yeah");
  };

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    this.router.navigate(['/']);
  }
}