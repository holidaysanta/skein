import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteEmptyComponent } from './note-empty/note-empty.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      { path: '', component: NoteEmptyComponent },
      { path: ':id', component: NoteDetailComponent },
    ],
  },
];
