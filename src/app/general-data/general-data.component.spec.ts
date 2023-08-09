import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDataComponent } from './general-data.component';

describe('GeneralDataComponent', () => {
  let component: GeneralDataComponent;
  let fixture: ComponentFixture<GeneralDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralDataComponent]
    });
    fixture = TestBed.createComponent(GeneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
