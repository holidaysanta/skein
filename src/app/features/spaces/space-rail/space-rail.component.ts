import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpacesStore } from '../../../data/spaces.store';
import { SpaceRailItemComponent } from '../space-rail-item/space-rail-item.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import {
  CreateSpaceDialogComponent,
  CreateSpaceDialogResult,
} from '../create-space-dialog/create-space-dialog.component';
import { LibraryFacade } from '../../../data/library.facade';

@Component({
  selector: 'app-space-rail',
  imports: [SpaceRailItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './space-rail.component.html',
  styleUrl: './space-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class SpaceRailComponent {
  private readonly router = inject(Router);
  private readonly library = inject(LibraryFacade);
  protected readonly spacesStore = inject(SpacesStore);
  protected readonly dialog = inject(Dialog);

  protected openDialog() {
    const dialogRef = this.dialog.open<CreateSpaceDialogResult>(CreateSpaceDialogComponent, {
      ariaLabelledBy: 'create-space-title',
    });

    dialogRef.closed.subscribe((space) => {
      if (!space) return;

      const id = this.library.createSpace(space.name, space.icon, space.color);

      this.router.navigate(['spaces', id]);
    });
  }
}
