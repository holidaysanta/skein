export const SPACE_NAME_MAX_LENGTH = 50;

export const SPACE_COLORS = [
  'blue',
  'green',
  'orange',
  'yellow',
  'pink',
  'teal',
  'violet',
  'red',
] as const;

export type SpaceColor = (typeof SPACE_COLORS)[number];

export const SPACE_ICONS = [
  'messages-square',
  'compass',
  'code',
  'lightbulb',
  'brain',
  'target',
  'book-open',
  'layers',
] as const;

export type SpaceIcon = (typeof SPACE_ICONS)[number];

export interface Space {
  id: string;
  name: string;
  icon: SpaceIcon;
  color: SpaceColor;
  createdAt: number;
}

export interface NoteSpaceLink {
  noteId: string;
  spaceId: string;
}
