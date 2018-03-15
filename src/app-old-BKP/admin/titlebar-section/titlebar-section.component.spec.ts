import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlebarSectionComponent } from './titlebar-section.component';

describe('TitlebarSectionComponent', () => {
  let component: TitlebarSectionComponent;
  let fixture: ComponentFixture<TitlebarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlebarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlebarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
