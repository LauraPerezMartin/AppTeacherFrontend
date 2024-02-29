import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token: string | null = localStorage.getItem('mytoken');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decodeToken = jwtDecode<any>(token);
  const exp = decodeToken.exp; //obtenemos la fecha de expiracion del token que esta en formato UNIX
  const fechaActual = new Date().getTime(); //obtenemos la fecha actual en formato UNIX

  if (exp > fechaActual) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
