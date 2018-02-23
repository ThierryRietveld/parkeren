import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private router: Router) {
  }

  sendData;

  Login(email, password) {
    this.sendData = {
      email: email,
      password: password
    };

    return this.http.post('http://localhost:4201/login', this.sendData);
  }

  Register(achternaam, email, nummer, rekening) {
    this.sendData = {
      achternaam: achternaam,
      email: email,
      nummer: nummer,
      rekening: rekening
    };

    this.http.post('http://localhost:4201/register', this.sendData)
      .subscribe(data => console.log(data));
  }

  Activate(password, id, token) {
    console.log(password, id);
    this.sendData = {
      password: password,
      id: id,
      token: token
    };
    return this.http.post('http://localhost:4201/activate', this.sendData);
  }

  GetUser(id, token) {
    this.sendData = {
      id: id,
      token: token
    };
    return this.http.post('http://localhost:4201/getUser', this.sendData);
  }

  IsLoggedIn() {
    if (!localStorage.getItem('userId') && !localStorage.getItem('userToken')) {
      return false;
    } else {
      this.sendData = {
        id: localStorage.getItem('userId'),
        token: localStorage.getItem('userToken')
      };

      this.http.post('http://localhost:4201/isloggedin', this.sendData)
        .subscribe(data => {
          if (data[0]) {

            return true;

          } else {

            return false;
          }
        });
    }
  }

  getReserveringen() {
    this.sendData = {
      id: localStorage.getItem('userId'),
      token: localStorage.getItem('userToken')
    };

    return this.http.post('http://localhost:4201/getReserveringen', this.sendData);
  }

  IsAdmin() {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');

    if (!localStorage.getItem('userId') && !localStorage.getItem('userToken')) {
      return false;
    } else {
    this.GetUser(id, token)
      .subscribe(data => {
        console.log(data);
        if (data[0].role === 2) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  getRoles() {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');

    this.sendData = {
      id: id,
      token: token
    };

    return this.http.post('http://localhost:4201/getRoles', this.sendData);
  }

  nieuweBestelling(form) {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    this.GetUser(id, token)
      .subscribe(data => {
        this.sendData = {
          form: form,
          user: data
        };

        this.http.post('http://localhost:4201/bestelling', this.sendData)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data => {
            if (data[0]) {
              this.router.navigate(['/reserveringen']);
            } else {
              alert('De datum is niet goed');
            }
          });
      });
  }

  uitrijden(userId, id) {
    this.sendData = {
      userId: userId,
      id: id
    };
    return this.http.post('http://localhost:4201/uitrijden', this.sendData);
  }

  binnenrijden(userId, id) {
    this.sendData = {
      userId: userId,
      id: id
    };
    return this.http.post('http://localhost:4201/binnenrijden', this.sendData);
  }

  searchReserveringen(types, kenteken) {
    this.sendData = {
      types: types,
      kenteken: kenteken
    };

    console.log(this.sendData);

    return this.http.post('http://localhost:4201/searchReserveringen', this.sendData);
  }

  betaal(userId, bestellingsId) {
    this.sendData = {
      userId: userId,
      bestellingId: bestellingsId,
      prijs: 100,
      tijd: new Date()
    };

    return this.http.post('http://localhost:4201/betalen', this.sendData);
  }

  getUsers() {
    this.sendData = {};
    return this.http.post('http://localhost:4201/getUsers', this.sendData);
  }

  getAllRoles() {
    this.sendData = {};
    return this.http.post('http://localhost:4201/getAllRoles', this.sendData);
  }

  addUserRole(id, role) {
    this.sendData = {
      id,
      role
    };
    return this.http.post('http://localhost:4201/addUserRole', this.sendData);
  }

  deleteUserRole(id, role) {
    this.sendData = {
      id,
      role
    };
    return this.http.post('http://localhost:4201/deleteUserRole', this.sendData);
  }

  getStayTime(userId, bestellingsId) {
    this.sendData = {
      userId,
      bestellingsId
    };
    return this.http.post('http://localhost:4201/getStayTime', this.sendData);
  }
}
