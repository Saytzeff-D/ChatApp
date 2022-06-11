import { TestBed } from '@angular/core/testing';

import { UserTrayService } from './user-tray.service';

describe('UserTrayService', () => {
  let service: UserTrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
