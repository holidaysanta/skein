import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { spaceExistsGuard } from './space-exists.guard';

describe('spaceExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => spaceExistsGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
