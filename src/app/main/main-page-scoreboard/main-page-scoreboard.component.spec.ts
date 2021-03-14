import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MainPageScoreboardComponent} from './main-page-scoreboard.component';

describe('MainPageDescktopComponent', () => {
  let component: MainPageScoreboardComponent;
  let fixture: ComponentFixture<MainPageScoreboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageScoreboardComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
