import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminauthenticationGuard } from './adminauthentication.guard';

describe('adminauthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminauthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
