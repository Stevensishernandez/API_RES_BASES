import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MRespuestasComponent } from './m-respuestas.component';

describe('MRespuestasComponent', () => {
  let component: MRespuestasComponent;
  let fixture: ComponentFixture<MRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MRespuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
