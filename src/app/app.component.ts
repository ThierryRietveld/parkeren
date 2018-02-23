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

  headerTitle = 'Lelystad Airport Parkeer';

  navbar = [];

  navbarStandard = [
    { location: '/', text: 'Contact' }
  ];

  navbarNotLoggedin = [
    { location: '/register', text: 'Registreren', icon: '' },
    { location: '/login', text: 'Login' }
  ];

  navbarLoggedin = [
    { location: '/reserveringen', text: 'Reserveren', icon: '' }
  ];

  navbarGaragemedewerker = [
    { location: '/garagemanager', text: 'Garagemaneger', icon: '' },
  ];

  navbarBeheerder = [
    { location: '/admin', text: 'Admin page', icon: '' },
  ];

  navbarBalie = [
    { location: '/baliemedewerker', text: 'Balie', icon: '' },
  ];

  navbarVisible = false;
  private _routerSub = Subscription.EMPTY;
  geluid = true;

  constructor(private router: Router, private data: DataService) {

    // Awesome sound effects
    const parkerenGeluiden = [new Audio('../assets/parkeren.mp3'), new Audio('../assets/parkerenn.ogg')];

    window.addEventListener('click', () => {
      const r = Math.floor(Math.random() * parkerenGeluiden.length);
      if (this.geluid) { parkerenGeluiden[r].currentTime = 0; parkerenGeluiden[r].play(); }
    });

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


        console.log('ddd');
        this.data.getRoles()
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data => {
            this.navbar = [];

            for (const bar of this.navbarStandard) {
              this.navbar.push(bar);
            }
            console.log(data);
            if (data[0]) {

              // tslint:disable-next-line:forin
              for (const role in data) {

                console.log(data[role]);
                if (data[role] === 'garagemedewerker') {

                  for (const bar of this.navbarGaragemedewerker) {
                    this.navbar.push(bar);
                  }
                } else if (data[role] === 'baliemedewerker') {
                  for (const bar of this.navbarBalie) {
                    this.navbar.push(bar);
                  }
                } else if (data[role] === 'beheerder') {
                  for (const bar of this.navbarBeheerder) {
                    this.navbar.push(bar);
                  }
                } else if (data[role] === 'gebruiker') {
                  for (const bar of this.navbarLoggedin) {
                    this.navbar.push(bar);
                  }
                }
              }
            } else {
              for (const bar of this.navbarNotLoggedin) {
                this.navbar.push(bar);
              }
            }
          });

        const route = value['urlAfterRedirects'];

        if (route !== undefined) {
          if (route === '/register') {
            this.headerTitle = 'Registreren';
          } else if (route === '/betalen') {
            this.headerTitle = 'Betalen';
          } else if (route === '/autos') {
            this.headerTitle = 'Overzicht Auto\'s';
          } else if (route === '/') {
            this.headerTitle = 'Lelystad Airport Parkeer';
          } else if (route === '/login') {
            this.headerTitle = 'Login';
          } else if (String(route).includes('/activate')) {
            this.headerTitle = 'Activeren';
          } else if (route === '/reserveringen') {
            this.headerTitle = 'Reserveringen';
          } else if (route === '/bestelling') {
            this.headerTitle = 'Nieuwe bestelling';
          } else if (route === '/garagemanager') {
            this.headerTitle = 'Garagemanager';
          } else if (String(route).includes('/betalen')) {
            this.headerTitle = 'Betalen';
          } else if (route === '/admin') {
            this.headerTitle = 'Admin';
          } else if (route === '/baliemedewerker') {
            this.headerTitle = 'Baliemedewerker';
          } else {
            this.headerTitle = '';
          }
        }
      });
  }

  boii() {
    console.log('yeah');
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }
}
