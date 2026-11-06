import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpacesStore } from '../../data/spaces.store';

export const spaceExistsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const spacesStore = inject(SpacesStore);
  const spaceId = route.paramMap.get('spaceId');

  const spaceExists = spacesStore.spaces().some((space) => space.id === spaceId);

  return spaceExists ? true : router.parseUrl('/notes');
};
