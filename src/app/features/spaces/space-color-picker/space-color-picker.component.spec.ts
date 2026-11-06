import { FormControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceColorPickerComponent } from './space-color-picker.component';
import { SpaceColor } from '../../../data/space.model';

describe('SpaceColorPickerComponent', () => {
  let component: SpaceColorPickerComponent;
  let fixture: ComponentFixture<SpaceColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceColorPickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'control',
      new FormControl<SpaceColor>('blue', { nonNullable: true })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
