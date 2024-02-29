import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const rolGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const rol: string | null = localStorage.getItem('rol');
  //const urlRol = route.url.pop()?.toString();
  const urlRol = route.url.find(urlSeg => urlSeg.toString() === rol);

  if (rol && urlRol?.toString() === rol) {
    return true;
  } else {
    localStorage.removeItem('mytoken');
    localStorage.removeItem('rol');
    router.navigate(['/login']);
    return false;
  }
};
