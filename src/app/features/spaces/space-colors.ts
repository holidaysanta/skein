import { SpaceColor } from '../../data/space.model';

export interface SpaceColorClasses {
  solid: string;
  hover: string;
}

export const SPACE_COLOR_CLASSES: Record<SpaceColor, SpaceColorClasses> = {
  blue: { solid: 'bg-blue-400', hover: 'hover:bg-blue-400/20' },
  green: { solid: 'bg-green-400', hover: 'hover:bg-green-400/20' },
  orange: { solid: 'bg-orange-400', hover: 'hover:bg-orange-400/20' },
  yellow: { solid: 'bg-yellow-400', hover: 'hover:bg-yellow-400/20' },
  pink: { solid: 'bg-pink-400', hover: 'hover:bg-pink-400/20' },
  teal: { solid: 'bg-teal-400', hover: 'hover:bg-teal-400/20' },
  violet: { solid: 'bg-violet-400', hover: 'hover:bg-violet-400/20' },
  red: { solid: 'bg-red-400', hover: 'hover:bg-red-400/20' },
};
