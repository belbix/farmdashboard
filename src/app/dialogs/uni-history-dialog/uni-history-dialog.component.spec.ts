import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UniHistoryDialogComponent } from './uni-history-dialog.component';

describe('UniHistoryDialogComponent', () => {
  let component: UniHistoryDialogComponent;
  let fixture: ComponentFixture<UniHistoryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UniHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
