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

export interface Space {
  id: string;
  name: string;
  icon: string;
  color: SpaceColor;
  createdAt: number;
}

export interface NoteSpaceLink {
  noteId: string;
  spaceId: string;
}
