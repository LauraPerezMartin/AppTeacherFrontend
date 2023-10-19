import { Component, OnInit } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent {
  profesoresPublic: Public[] = [];

  constructor(
    private publicService: PublicService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.publicService.getAll();
      this.profesoresPublic = response;
    } catch (error: any) { //comprobar en 1h 3min
      console.log(error);
    }
  }
}
//continuar video 1:09 