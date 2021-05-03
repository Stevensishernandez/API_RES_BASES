import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPaisComponent } from './cpais.component';

describe('CPaisComponent', () => {
  let component: CPaisComponent;
  let fixture: ComponentFixture<CPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
