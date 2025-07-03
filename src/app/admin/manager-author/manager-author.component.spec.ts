import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAuthorComponent } from './manager-author.component';

describe('ManagerAuthorComponent', () => {
  let component: ManagerAuthorComponent;
  let fixture: ComponentFixture<ManagerAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
