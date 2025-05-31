import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sessionKeyGuard } from './session-key.guard';

describe('sessionKeyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionKeyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
