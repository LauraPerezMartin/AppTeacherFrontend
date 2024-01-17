import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }
  logado: boolean = false;
  rolAdmin: boolean = false;
  rolProfe: boolean = false;
  rolAlum: boolean = false;

  ngDoCheck(): void {
    const token: string | null = localStorage.getItem('mytoken');
    const rol: string | null = localStorage.getItem('rol');

    this.logado = (token) ? true : false;
    this.rolAdmin = (this.logado && rol === 'admin') ? true : false;
    this.rolProfe = (token && rol === 'profe') ? true : false;
    this.rolAlum = (token && rol === 'alum') ? true : false;
  }

  logout(): void {
    localStorage.removeItem('mytoken');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
