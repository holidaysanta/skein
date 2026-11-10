import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NotePlaceholderComponent } from './note-placeholder/note-placeholder.component';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      { path: '', component: NotePlaceholderComponent },
      {
        path: ':id',
        loadComponent: () =>
          import('./note-detail/note-detail.component').then((m) => m.NoteDetailComponent),
      },
    ],
  },
];
