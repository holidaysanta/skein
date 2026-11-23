import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpaceRailComponent } from '../../features/spaces/space-rail/space-rail.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [SpaceRailComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'isolate grid h-dvh grid-cols-[var(--rail-width)_18.75rem_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] p-3 [--rail-width:7.5rem]',
  },
})
export class ShellComponent {}
