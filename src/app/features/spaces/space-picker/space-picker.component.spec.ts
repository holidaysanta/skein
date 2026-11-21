import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePickerComponent } from './space-picker.component';

describe('SpacePickerComponent', () => {
  let component: SpacePickerComponent;
  let fixture: ComponentFixture<SpacePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpacePickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
