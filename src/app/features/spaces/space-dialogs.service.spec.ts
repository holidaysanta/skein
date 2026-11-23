import { TestBed } from '@angular/core/testing';

import { SpaceDialogsService } from './space-dialogs.service';

describe('SpaceDialogsService', () => {
  let service: SpaceDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
