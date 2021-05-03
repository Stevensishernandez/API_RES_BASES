import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPreguntaComponent } from './c-pregunta.component';

describe('CPreguntaComponent', () => {
  let component: CPreguntaComponent;
  let fixture: ComponentFixture<CPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
