import { TestBed } from '@angular/core/testing';

import { EmailvalidatorService } from './emailvalidator.service';

describe('EmailvalidatorService', () => {
  let service: EmailvalidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailvalidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
