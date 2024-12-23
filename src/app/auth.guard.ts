import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.checkAdmin()) {
      return true;
    }
    else {
      return false;
    }
  }

  checkAdmin() {
    const admin = localStorage.getItem('isAdmin');
    if (admin != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
