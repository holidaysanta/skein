import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Note } from '../../../data/note.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MarkdownToPlainPipe } from '../../../shared/markdown-to-plain/markdown-to-plain.pipe';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ACTION_MENU_POSITIONS } from '../../../shared/menu-position';

@Component({
  selector: 'app-note-list-item',
  imports: [
    RouterLink,
    RouterLinkActive,
    MarkdownToPlainPipe,
    CdkMenuTrigger,
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
  templateUrl: './note-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  readonly note = input.required<Note>();
  readonly removeLabel = input.required<string>();
  readonly spacesRequested = output<void>();
  readonly removeRequested = output<void>();

  protected readonly menuPosition = ACTION_MENU_POSITIONS;
}
