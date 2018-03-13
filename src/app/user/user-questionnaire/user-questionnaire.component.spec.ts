import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuestionnaireComponent } from './user-questionnaire.component';

describe('UserQuestionnaireComponent', () => {
	let component: UserQuestionnaireComponent;
	let fixture: ComponentFixture<UserQuestionnaireComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserQuestionnaireComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserQuestionnaireComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
