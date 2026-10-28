import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Space } from '../../../data/space.model';
import { SPACE_COLOR_CLASSES } from '../space-colors';

@Component({
  selector: 'app-space-rail-item',
  imports: [],
  templateUrl: './space-rail-item.component.html',
  styleUrl: './space-rail-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceRailItemComponent {
  readonly space = input.required<Space>();

  protected readonly colorsClass = computed(() => {
    return SPACE_COLOR_CLASSES[this.space().color];
  });
}
