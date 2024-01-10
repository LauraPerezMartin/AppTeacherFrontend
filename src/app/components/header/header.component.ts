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

  ngDoCheck(): void {
    const token: string | null = localStorage.getItem('mytoken');
    this.logado = (token) ? true : false;
  }

  logout(): void {
    localStorage.removeItem('mytoken');
    this.router.navigate(['/login']);
  }
}
