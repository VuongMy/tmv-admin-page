import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIntroductionComponent } from './dialog-introduction.component';

describe('DialogIntroductionComponent', () => {
  let component: DialogIntroductionComponent;
  let fixture: ComponentFixture<DialogIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
