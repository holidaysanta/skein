import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Space } from '../../../data/space.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SPACE_COLOR_VALUES } from '../../../shared/space-colors';

@Component({
  selector: 'app-space-rail-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './space-rail-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceRailItemComponent {
  readonly space = input.required<Space>();

  protected readonly colorValue = computed(() => {
    return SPACE_COLOR_VALUES[this.space().color];
  });
}
