import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNewsComponent } from './manager-news.component';

describe('ManagerNewsComponent', () => {
  let component: ManagerNewsComponent;
  let fixture: ComponentFixture<ManagerNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
