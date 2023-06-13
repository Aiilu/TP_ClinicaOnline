import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicTurnosComponent } from './solic-turnos.component';

describe('SolicTurnosComponent', () => {
  let component: SolicTurnosComponent;
  let fixture: ComponentFixture<SolicTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
