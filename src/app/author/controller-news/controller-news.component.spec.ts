import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerNewsComponent } from './controller-news.component';

describe('ControllerNewsComponent', () => {
  let component: ControllerNewsComponent;
  let fixture: ComponentFixture<ControllerNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllerNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
