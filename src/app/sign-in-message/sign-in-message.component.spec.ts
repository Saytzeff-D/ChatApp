import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInMessageComponent } from './sign-in-message.component';

describe('SignInMessageComponent', () => {
  let component: SignInMessageComponent;
  let fixture: ComponentFixture<SignInMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
