import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacSiComponent } from './bac-si.component';

describe('BacSiComponent', () => {
  let component: BacSiComponent;
  let fixture: ComponentFixture<BacSiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacSiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
