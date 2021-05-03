import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MInventosComponent } from './m-inventos.component';

describe('MInventosComponent', () => {
  let component: MInventosComponent;
  let fixture: ComponentFixture<MInventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MInventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MInventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
