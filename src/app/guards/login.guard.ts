import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('mytoken')
  if (token) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
