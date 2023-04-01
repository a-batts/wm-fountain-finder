import { TestBed } from '@angular/core/testing';

import { FountainsService } from './fountains.service';

describe('FountainsService', () => {
  let service: FountainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FountainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
