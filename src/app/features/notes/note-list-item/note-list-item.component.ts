import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Note } from '../note.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-note-list-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './note-list-item.component.html',
  styleUrl: './note-list-item.component.scss',  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  readonly note = input.required<Note>();
  readonly deleted = output<void>();
}
