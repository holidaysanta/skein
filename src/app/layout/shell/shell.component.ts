import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpaceRailComponent } from '../../features/spaces/space-rail/space-rail.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [SpaceRailComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex h-dvh p-3 gap-3' },
})
export class ShellComponent {}
