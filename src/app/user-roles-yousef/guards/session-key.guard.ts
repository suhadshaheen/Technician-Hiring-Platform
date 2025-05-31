import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class SessionKeyGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const keyFromUrl = route.queryParamMap.get('key');
    const sessionKey = localStorage.getItem('session_key');
    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn && keyFromUrl === sessionKey) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
