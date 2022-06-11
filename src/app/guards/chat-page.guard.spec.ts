import { TestBed } from '@angular/core/testing';

import { ChatPageGuard } from './chat-page.guard';

describe('ChatPageGuard', () => {
  let guard: ChatPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChatPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
