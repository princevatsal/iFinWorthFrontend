import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialValuesComponent } from './financial-values.component';

describe('FinancialValuesComponent', () => {
  let component: FinancialValuesComponent;
  let fixture: ComponentFixture<FinancialValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialValuesComponent]
    });
    fixture = TestBed.createComponent(FinancialValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
