import { TestBed } from '@angular/core/testing';

import { EditorStylesService } from './editor-styles.service';

describe('EditorStylesService', () => {
  let service: EditorStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
