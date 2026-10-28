import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      {
        path: 'notes',
        loadChildren: () => import('./features/notes/notes.routes').then((m) => m.NOTES_ROUTES),
      },
      {
        path: 'spaces/:spaceId',
        children: [
          { path: '', redirectTo: 'notes', pathMatch: 'full' },
          {
            path: 'notes',
            loadChildren: () => import('./features/notes/notes.routes').then((m) => m.NOTES_ROUTES),
          },
        ],
      },
      { path: '**', redirectTo: '/notes' },
    ],
  },
];
