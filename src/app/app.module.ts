import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { C404Component } from './components/c404/c404.component';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/home/mapa/mapa.component';
import { ProfesorCardComponent } from './components/home/profesor-card/profesor-card.component';
import { ProfesorListComponent } from './components/home/profesor-list/profesor-list.component';
import { ProfesorSearchComponent } from './components/home/profesor-search/profesor-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    C404Component,
    HomeComponent,
    MapaComponent,
    ProfesorCardComponent,
    ProfesorListComponent,
    ProfesorSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
