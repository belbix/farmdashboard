import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {GrainChartComponent} from './grain-chart.component';

describe('GrainChartComponent', () => {
  let component: GrainChartComponent;
  let fixture: ComponentFixture<GrainChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GrainChartComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
