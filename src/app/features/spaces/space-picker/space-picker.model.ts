import { SpaceDraft } from '../../../data/space.model';

export type SpacePickerOption = SpaceDraft & {
  id: string;
  isDraft?: boolean;
};
