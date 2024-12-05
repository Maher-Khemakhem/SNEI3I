import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { workerAuthGuard } from './worker-auth.guard';

describe('workerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
