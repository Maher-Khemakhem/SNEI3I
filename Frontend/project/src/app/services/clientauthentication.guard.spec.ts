import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientauthenticationGuard } from './clientauthentication.guard';

describe('clientauthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientauthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
