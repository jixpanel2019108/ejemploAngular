import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEncuestaComponent } from './detalle-encuesta.component';

describe('DetalleEncuestaComponent', () => {
  let component: DetalleEncuestaComponent;
  let fixture: ComponentFixture<DetalleEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
