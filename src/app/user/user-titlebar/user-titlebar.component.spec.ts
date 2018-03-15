import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTitlebarComponent } from './user-titlebar.component';

describe('UserTitlebarComponent', () => {
	let component: UserTitlebarComponent;
	let fixture: ComponentFixture<UserTitlebarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserTitlebarComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserTitlebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
