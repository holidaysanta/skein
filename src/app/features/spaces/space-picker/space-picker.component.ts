import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SPACE_COLOR_VALUES } from '../../../shared/space-colors';
import { SpacePickerOption } from './space-picker.model';

@Component({
  selector: 'app-space-picker',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpacePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './space-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacePickerComponent implements ControlValueAccessor {
  readonly options = input.required<readonly SpacePickerOption[]>();

  private onTouched: () => void = () => {};
  private onChange: (value: readonly string[]) => void = () => {};

  protected readonly selectedIds = signal<readonly string[]>([]);
  protected readonly disabled = signal(false);

  protected readonly colorValues = SPACE_COLOR_VALUES;

  writeValue(value: readonly string[] | null): void {
    this.selectedIds.set(value ?? []);
  }

  registerOnChange(fn: (value: readonly string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected setSelected(id: string, selected: boolean): void {
    if (this.disabled()) return;

    const nextSelection = new Set(this.selectedIds());

    if (selected) {
      nextSelection.add(id);
    } else {
      nextSelection.delete(id);
    }

    const nextIds = [...nextSelection];
    this.selectedIds.set(nextIds);

    this.onChange(nextIds);
  }

  protected handleFocusOut(event: FocusEvent, container: HTMLElement): void {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && container.contains(nextTarget)) {
      return;
    }

    this.onTouched();
  }
}
