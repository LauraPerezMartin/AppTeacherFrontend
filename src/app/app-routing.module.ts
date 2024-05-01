import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { loginGuard } from './guards/login.guard';
import { rolGuard } from './guards/rol.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProfeDashboardComponent } from './components/profe-dashboard/profe-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Inicio', },
  { path: 'login', component: LoginComponent, title: 'Login', },
  { path: 'registro', component: RegistroComponent, title: 'Registro' },
  { path: 'dashboard/admin', component: AdminDashboardComponent, canActivate: [loginGuard, rolGuard], title: 'Dashboard administradores' },
  { path: 'dashboard/admin/usuario/:idusuario', component: PerfilComponent, canActivate: [loginGuard, rolGuard], title: 'Perfil del profesor' },
  { path: 'dashboard/profe', component: ProfeDashboardComponent, canActivate: [loginGuard, rolGuard], title: 'Dashboard profesores' },
  { path: 'dashboard/profe/perfil', component: PerfilComponent, canActivate: [loginGuard, rolGuard], title: 'Perfil' },
  { path: '**', component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
