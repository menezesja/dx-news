import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAuthor } from './manager-author.component';

describe('ManagerAuthor', () => {
  let component: ManagerAuthor;
  let fixture: ComponentFixture<ManagerAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAuthor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
