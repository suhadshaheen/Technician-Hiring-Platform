import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const key = route.queryParamMap.get('key');
    const token = localStorage.getItem('token');

    if (token && key === token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
