import { TestBed } from '@angular/core/testing';

import { SakeService } from './sake.service';

describe('SakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SakeService = TestBed.get(SakeService);
    expect(service).toBeTruthy();
  });
});
