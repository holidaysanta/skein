import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { THEMES, ThemeStore } from '../../core/theme.store';

@Component({
  selector: 'app-theme-picker',
  imports: [],
  templateUrl: './theme-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'w-full flex items-center justify-center gap-4' },
})
export class ThemePickerComponent {
  protected readonly themeStore = inject(ThemeStore);
  protected readonly themes = THEMES;
}
