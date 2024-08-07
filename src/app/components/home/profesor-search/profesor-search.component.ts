import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-profesor-search',
  templateUrl: './profesor-search.component.html',
  styleUrls: ['./profesor-search.component.css']
})
export class ProfesorSearchComponent implements OnInit {
  asignaturas: any[] = [];
  ciudades: any[] = [];
  @Output() searchTerms: EventEmitter<any>;

  constructor(private publicService: PublicService) {
    this.searchTerms = new EventEmitter();
  }

  async ngOnInit(): Promise<void> {
    try {
      this.ciudades = await this.publicService.getCiudades();
      this.asignaturas = await this.publicService.getAsignaturas();
    } catch (error: any) {
      console.log(error);
    }
  }

  getDataForm(searchForm: any): void {
    this.searchTerms.emit(searchForm.value);
  }
}
