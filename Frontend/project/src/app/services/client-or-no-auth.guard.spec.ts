import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientOrNoAuthGuard } from './client-or-no-auth.guard';

describe('clientOrNoAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientOrNoAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
