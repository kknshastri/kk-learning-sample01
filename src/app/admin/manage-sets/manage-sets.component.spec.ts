import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSetsComponent } from './manage-sets.component';

describe('ManageSetsComponent', () => {
	let component: ManageSetsComponent;
	let fixture: ComponentFixture<ManageSetsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ManageSetsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageSetsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
