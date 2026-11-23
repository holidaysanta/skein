import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { Space, SpaceDraft } from '../../data/space.model';
import {
  SpaceFormDialogComponent,
  SpaceFormDialogData,
} from './space-form-dialog/space-form-dialog.component';
import { LibraryFacade } from '../../data/library.facade';
import {
  DeleteSpaceDialogComponent,
  DeleteSpaceDialogData,
} from './delete-space-dialog/delete-space-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SpaceDialogsService {
  private readonly dialog = inject(Dialog);
  private readonly router = inject(Router);
  private readonly library = inject(LibraryFacade);

  openEditSpaceDialog(space: Space): void {
    const dialogRef = this.dialog.open<SpaceDraft, SpaceFormDialogData>(SpaceFormDialogComponent, {
      data: {
        space: {
          name: space.name,
          icon: space.icon,
          color: space.color,
        },
      },
      ariaLabelledBy: 'space-form-title',
    });

    dialogRef.closed.subscribe((result) => {
      if (!result) return;

      this.library.updateSpace(space.id, result);
    });
  }

  openDeleteSpaceDialog(space: Space): void {
    const dialogRef = this.dialog.open<boolean, DeleteSpaceDialogData>(DeleteSpaceDialogComponent, {
      data: { name: space.name },
      ariaLabelledBy: 'delete-space-title',
    });

    dialogRef.closed.subscribe((confirmed) => {
      if (!confirmed) return;

      const spaceUrl = this.router.createUrlTree(['/spaces', space.id, 'notes']);
      const isCurrentSpace = this.router.isActive(spaceUrl, {
        paths: 'subset',
        queryParams: 'ignored',
        matrixParams: 'ignored',
        fragment: 'ignored',
      });

      this.library.deleteSpace(space.id);

      if (isCurrentSpace) {
        this.router.navigate(['/notes']);
      }
    });
  }
}
