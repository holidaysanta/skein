import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceIconPickerComponent } from './space-icon-picker.component';
import { FormControl } from '@angular/forms';
import { SpaceColor, SpaceIcon } from '../../../data/space.model';

describe('SpaceIconPickerComponent', () => {
  let component: SpaceIconPickerComponent;
  let fixture: ComponentFixture<SpaceIconPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceIconPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceIconPickerComponent);

    fixture.componentRef.setInput(
      'control',
      new FormControl<SpaceIcon>('messages-square', { nonNullable: true })
    );
    fixture.componentRef.setInput('color', 'blue' satisfies SpaceColor);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
