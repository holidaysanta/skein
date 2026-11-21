import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Space } from '../../../data/space.model';
import { I18nPluralPipe } from '@angular/common';
import { SpaceBadgeComponent } from '../../../shared/space-badge/space-badge.component';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { STANDARD_DROPDOWN_BELOW_POSITIONS } from '@angular/cdk/overlay';
import { SpaceActionsMenuComponent } from '../../spaces/space-actions-menu/space-actions-menu.component';

@Component({
  selector: 'app-note-list-header',
  imports: [I18nPluralPipe, SpaceBadgeComponent, CdkMenuTrigger, SpaceActionsMenuComponent],
  templateUrl: './note-list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListHeaderComponent {
  readonly space = input<Space>();
  readonly noteCount = input.required<number>();

  readonly editRequested = output<Space>();
  readonly deleteRequested = output<Space>();

  protected readonly noteCountLabels = {
    one: '# заметка',
    few: '# заметки',
    many: '# заметок',
    other: '# заметок',
  };

  protected readonly menuPosition = STANDARD_DROPDOWN_BELOW_POSITIONS.map((position) => {
    return {
      ...position,
      offsetY: position.overlayY === 'top' ? 8 : -8,
    };
  });
}
