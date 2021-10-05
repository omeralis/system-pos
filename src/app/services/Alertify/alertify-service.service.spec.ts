import { TestBed } from '@angular/core/testing';

import { AlertifyServiceService } from './alertify-service.service';

describe('AlertifyServiceService', () => {
  let service: AlertifyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertifyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
