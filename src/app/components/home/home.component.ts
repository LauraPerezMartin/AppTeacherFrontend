import { Component, OnInit } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  profesoresPublic: Public[] = [];

  constructor(private publicService: PublicService) { }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.publicService.getAll();
      this.profesoresPublic = response;
    } catch (error: any) {
      console.log(error);
    }
  }
}
