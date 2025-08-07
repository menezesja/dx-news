import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNews } from './manager-news.component';

describe('ManagerNews', () => {
  let component: ManagerNews;
  let fixture: ComponentFixture<ManagerNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
