import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Space } from '../../../data/space.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SPACE_COLOR_VALUES } from '../../../shared/space-colors';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import { SpaceActionsMenuComponent } from '../space-actions-menu/space-actions-menu.component';
import { SpaceDialogsService } from '../space-dialogs.service';

@Component({
  selector: 'app-space-rail-item',
  imports: [RouterLink, RouterLinkActive, CdkContextMenuTrigger, SpaceActionsMenuComponent],
  templateUrl: './space-rail-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceRailItemComponent {
  private readonly spaceDialogs = inject(SpaceDialogsService);

  readonly space = input.required<Space>();
  readonly editRequested = output<string>();
  readonly deleteRequested = output<string>();

  protected readonly colorValue = computed(() => {
    return SPACE_COLOR_VALUES[this.space().color];
  });

  protected openEditSpaceDialog(space: Space): void {
    this.spaceDialogs.openEditSpaceDialog(space);
  }

  protected openDeleteSpaceDialog(space: Space): void {
    this.spaceDialogs.openDeleteSpaceDialog(space);
  }
}
