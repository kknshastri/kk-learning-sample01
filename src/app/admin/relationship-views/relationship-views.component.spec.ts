import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipViewsComponent } from './relationship-views.component';

describe('RelationshipViewsComponent', () => {
  let component: RelationshipViewsComponent;
  let fixture: ComponentFixture<RelationshipViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
