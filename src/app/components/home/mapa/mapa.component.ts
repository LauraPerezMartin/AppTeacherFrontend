import { Component, Input, OnInit } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @Input() profesores: Public | any;
  map: any;
  markersLayers = L.layerGroup(); //lo inicializamos para que nos de error 

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.getMarkers();
  }

  initMap(): void {
    //Configuración del mapa
    this.map = L.map('map', {
      center: [40.43060864580363, -3.6678882528855508],
      attributionControl: false,
      zoom: 6
    });

    //iconos personalizados
    const iconDefault = L.icon({
      iconUrl: 'assets/location-green.svg',
      iconSize: [40, 31],
      iconAnchor: [20, 10]
    });
    L.Marker.prototype.options.icon = iconDefault;

    //titulo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; App Teacher'
    }).addTo(this.map);

    //añadimos el grupo de capas al mapa
    this.markersLayers.addTo(this.map)
  }

  getMarkers(): void {

    let marker: any;
    //if (this.markersLayers.hasLayer(marker)) {
    this.markersLayers.clearLayers();
    //}
    //marcamos las ubicaciones de los profesores
    this.profesores.forEach((profesor: Public | any) => {
      const nombreCompleto = `${profesor.nombre} ${profesor.apellidos}`;
      //obtenemos el listado de asignaturas del profesor
      const asignaturas = profesor.asignaturas.map((asignatura: any, index: number) => asignatura.nombre);

      //añadimos marcadores a grupo de capas
      marker = L.marker([profesor.latitud, profesor.longitud]).bindPopup(`${nombreCompleto}<br><strong>${asignaturas}</strong>`);
      this.markersLayers.addLayer(marker);
    });

  }
}
