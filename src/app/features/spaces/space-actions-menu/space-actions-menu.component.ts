import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-space-actions-menu',
  imports: [CdkMenu, CdkMenuItem],
  templateUrl: './space-actions-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceActionsMenuComponent {
  readonly editRequested = output<void>();
  readonly deleteRequested = output<void>();
}
