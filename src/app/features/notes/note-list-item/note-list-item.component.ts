import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Note } from '../../../data/note.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MarkdownToPlainPipe } from '../../../shared/markdown-to-plain/markdown-to-plain.pipe';

@Component({
  selector: 'app-note-list-item',
  imports: [RouterLink, RouterLinkActive, MarkdownToPlainPipe],
  templateUrl: './note-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  readonly note = input.required<Note>();
  readonly removeLabel = input.required<string>();
  readonly removeRequested = output<void>();
}
