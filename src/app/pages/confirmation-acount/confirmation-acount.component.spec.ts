import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAcountComponent } from './confirmation-acount.component';

describe('ConfirmationAcountComponent', () => {
  let component: ConfirmationAcountComponent;
  let fixture: ComponentFixture<ConfirmationAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
