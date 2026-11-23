import { STANDARD_DROPDOWN_BELOW_POSITIONS } from '@angular/cdk/overlay';

export const ACTION_MENU_POSITIONS = STANDARD_DROPDOWN_BELOW_POSITIONS.map((position) => ({
  ...position,
  offsetY: position.overlayY === 'top' ? 8 : -8,
}));
