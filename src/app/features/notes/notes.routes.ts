import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NotePlaceholderComponent } from './note-placeholder/note-placeholder.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      { path: '', component: NotePlaceholderComponent },
      {
        path: ':id',
        component: NoteDetailComponent,
      },
    ],
  },
];
