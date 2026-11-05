import { SPACE_COLOR_VALUES } from '../space-colors';
import { SpaceColor, SpaceIcon } from './../../data/space.model';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-space-badge',
  imports: [],
  templateUrl: './space-badge.component.html',
  styleUrl: './space-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceBadgeComponent {
  readonly icon = input.required<SpaceIcon>();
  readonly color = input.required<SpaceColor>();

  protected readonly colorValues = SPACE_COLOR_VALUES;
}
