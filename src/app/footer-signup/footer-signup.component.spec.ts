import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSignup } from './footer-signup.component.js';

describe('FooterSignup', () => {
  let component: FooterSignup;
  let fixture: ComponentFixture<FooterSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSignup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSignup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
