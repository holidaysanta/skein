import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpacesStore } from '../../../data/spaces.store';
import { SpaceRailItemComponent } from '../space-rail-item/space-rail-item.component';

@Component({
  selector: 'app-space-rail',
  imports: [SpaceRailItemComponent],
  templateUrl: './space-rail.component.html',
  styleUrl: './space-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class SpaceRailComponent {
  protected readonly spacesStore = inject(SpacesStore);
}
