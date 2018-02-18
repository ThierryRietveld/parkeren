import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private data:DataService,private router:Router) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.data.IsLoggedIn()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
