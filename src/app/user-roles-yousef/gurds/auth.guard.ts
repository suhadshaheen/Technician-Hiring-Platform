import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router , RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class KeyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean {
    const key = route.queryParamMap.get('key');
    const token = localStorage.getItem('token');
    const expectedRole = route.data['role'];
    const userRole = localStorage.getItem('role');

    if (expectedRole) {
      if (token && userRole && userRole.toLowerCase() === expectedRole.toLowerCase()) {
        return true;
      }
    } else {
      if (token && (!key || key === token)) {
        return true;
      }
    }



      this.router.navigate(['/login']);
    return false;
  }
}
