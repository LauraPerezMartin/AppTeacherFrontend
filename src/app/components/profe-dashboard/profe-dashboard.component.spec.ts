import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfeDashboardComponent } from './profe-dashboard.component';

describe('ProfeDashboardComponent', () => {
  let component: ProfeDashboardComponent;
  let fixture: ComponentFixture<ProfeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfeDashboardComponent]
    });
    fixture = TestBed.createComponent(ProfeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
