import { TestBed } from '@angular/core/testing';

import { MsgTrayService } from './msg-tray.service';

describe('MsgTrayService', () => {
  let service: MsgTrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgTrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
