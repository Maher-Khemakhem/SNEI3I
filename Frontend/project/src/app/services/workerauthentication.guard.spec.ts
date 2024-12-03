import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { workerauthenticationGuard } from './workerauthentication.guard';

describe('workerauthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workerauthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
