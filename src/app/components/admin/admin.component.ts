import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [];
  editUser = false;
  editUsert = { roles: [], id: 0 };

  roles = [];

  qtd = {
    'gebruiker': false,
    'baliemedewerker': false,
    'beheerder': false,
    'garagemedewerker': false
  };



  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    this.data.getRoles()
      .subscribe(data => {

        if (data[0]) {
          let access = false;

          // tslint:disable-next-line:forin
          for (const role in data) {

            console.log(data[role]);
            if (data[role] === 'beheerder') {
              access = true;
            }
          }

          if (!access) {
            this.router.navigate(['/']);
          }

        } else {
          this.router.navigate(['/']);
        }
      });

    this.data.getUsers()
      .subscribe(data => {
        console.log(data.constructor);
        // tslint:disable-next-line:forin
        for (const user in data) {
          this.users.push(data[user]);
        }
      });

    this.data.getAllRoles()
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line:forin
        for (const role in data) {
          this.roles.push(data[role]);
        }
      });
  }

  clickUser(userId) {

    this.editUser = true;

    // tslint:disable-next-line:forin
    for (const role in this.qtd) {
      this.qtd[role] = false;
    }

    for (const user of this.users) {

      if (user.id === userId) {

        this.editUsert = user;
        for (const role of this.editUsert.roles) {

          if (role in this.qtd) {
            this.qtd[role] = true;
          }
        }
      }
    }

  }

  closeUser() {
    this.editUser = false;
  }

  roleChanged(toggle, role) {
    console.log(toggle, role);

    if (toggle) {

      this.data.addUserRole(this.editUsert.id, role)
        .subscribe(data => {

          this.users.forEach(user => {

            if (user.id === this.editUsert.id) {

              user.roles.push(role);
            }
          });
        });
    } else {
      this.data.deleteUserRole(this.editUsert.id, role)

        .subscribe(data => {
          this.users.forEach(user => {

            if (user.id === this.editUsert.id) {

              user.roles.forEach((userRole, i) => {

                if (userRole === role) {

                  user.roles.splice(i, 1);
                }
              });
            }
          });
        });
    }

  }

}
