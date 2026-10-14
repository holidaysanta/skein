import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Note } from '../note.model';
import { MarkdownToHtmlPipe } from '../../../shared/markdown-to-html.pipe';

@Component({
  selector: 'app-note-view',
  imports: [MarkdownToHtmlPipe],
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' },
})
export class NoteViewComponent {
  readonly note = input.required<Note>();
}
