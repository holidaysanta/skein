import type { SpacePickerOption } from './space-picker/space-picker.model';

export function prioritizeSelectedSpaces(
  spaces: readonly SpacePickerOption[],
  initialSpaceIds: readonly string[]
): SpacePickerOption[] {
  const initialIds = new Set(initialSpaceIds);

  const selectedSpaces = spaces.filter((space) => initialIds.has(space.id));

  const otherSpaces = spaces.filter((space) => !initialIds.has(space.id));

  return [...selectedSpaces, ...otherSpaces];
}
