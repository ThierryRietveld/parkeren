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
  editUsert = {roles: [], id:0};

  roles = [];

  qtd = {
    "gebruiker" : false,
    "baliemedewerker" : false,
    "beheerder" : false,
    "garagemedewerker" : false
  };

  

  constructor(private data:DataService, private router:Router) { }

  ngOnInit() {
    this.data.getRoles()
      .subscribe(data => {
        
        if(data[0]) {
          let access = false;
          for(let role in data){

            console.log(data[role]);
            if(data[role] == "beheerder"){
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
    
    this.data.getUsers()
      .subscribe(data => {
        console.log(data);
        for(let user in data){
          this.users.push(data[user]);
        }
      });
    
    this.data.getAllRoles()
      .subscribe(data => {
        console.log(data);
        for(let role in data){
          this.roles.push(data[role]);
        }
      });
  }

  clickUser(userId){
    this.editUser = true;
    console.log("user",userId);

    for(let role in this.qtd){
      this.qtd[role] = false;
    }

    for(let user of this.users){
      if(user.id == userId){
        this.editUsert = user;
        console.log(this.editUsert);
        for(let role of this.editUsert.roles){
          console.log(Boolean());

          if(role in this.qtd){
            this.qtd[role] = true;
          }
        }
      }
    }
    
  }

  closeUser(){
    this.editUser = false;
  }

  roleChanged(toggle, role){
    console.log(toggle, role);
    if(toggle){
      this.data.addUserRole(this.editUsert.id, role)
        .subscribe(data => {
          console.log(data);
        });
    } else {
      this.data.deleteUserRole(this.editUsert.id, role)
        .subscribe(data => {
          console.log(data);
        });
    }

    
  }

}
