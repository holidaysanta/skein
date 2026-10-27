import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Space } from '../../../data/space.model';

@Component({
  selector: 'app-space-rail-item',
  imports: [],
  templateUrl: './space-rail-item.component.html',
  styleUrl: './space-rail-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceRailItemComponent {
  readonly space = input.required<Space>();
}
