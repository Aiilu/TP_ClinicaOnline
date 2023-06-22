import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistclinicoComponent } from './histclinico.component';

describe('HistclinicoComponent', () => {
  let component: HistclinicoComponent;
  let fixture: ComponentFixture<HistclinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistclinicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistclinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
