import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTitlebarComponent } from './home-titlebar.component';

describe('HomeTitlebarComponent', () => {
  let component: HomeTitlebarComponent;
  let fixture: ComponentFixture<HomeTitlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTitlebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
