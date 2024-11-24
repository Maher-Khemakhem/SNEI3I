import { TestBed } from '@angular/core/testing';

import { SignupClientService } from './signup-client.service';

describe('SignupClientService', () => {
  let service: SignupClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
