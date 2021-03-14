import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleModalComponent } from './simple-modal.component';

describe('SimpleModalComponent', () => {
  let component: SimpleModalComponent;
  let fixture: ComponentFixture<SimpleModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
