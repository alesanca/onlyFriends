import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserguardService {

  constructor(public jwtHelper: JwtHelperService, public router: Router) {}


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public canActivate(): boolean {
    if (this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
