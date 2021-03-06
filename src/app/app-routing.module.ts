import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo/demo/demo.component';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { HomeContentComponent } from './admin/home-content/home-content.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { ManageQuestionsComponent } from './admin/manage-questions/manage-questions.component';
import { ManageSectionsComponent } from './admin/manage-sections/manage-sections.component';
import { ManageQuestionnaireComponent } from './admin/manage-questionnaire/manage-questionnaire.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserQuestionnaireComponent } from './user/user-questionnaire/user-questionnaire.component';
import { UploadQuestionComponent } from './admin/upload-question/upload-question.component';
import { HomeLandingComponent } from './home/home-landing/home-landing.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeLandingComponent
	},
	{
		path: 'demo',
		component: DemoComponent,
		canActivate: [UserAuthGuard]
	},
	{
		path: 'dashboard',
		component: UserLandingComponent,
		canActivate: [UserAuthGuard],
		children: [
			{
				path: '',
				component: UserHomeComponent
			},
			{
				path: 'home',
				component: UserHomeComponent
			},
			{
				path: 'questionnaire',
				component: UserQuestionnaireComponent
			}
		]
	},
	{
		path: 'adminDashboard',
		component: AdminLandingComponent,
		canActivate: [AdminAuthGuard],
		children: [
			{
				path: '',
				component: ManageQuestionsComponent
			},
			{
				path: 'home',
				component: ManageQuestionsComponent
				// component: HomeContentComponent
			},
			{
				path: 'homeOld',
				component: HomeContentComponent
			},
			{
				path: 'manageQues',
				component: ManageQuestionsComponent
			},
			{
				path: 'manageSections',
				component: ManageSectionsComponent
			},
			{
				path: 'manageQuestionnaire',
				component: ManageQuestionnaireComponent
			},
			{
				path: 'manageUsers',
				component: ManageUsersComponent
			},
			{
				path: 'uploadQues',
				component: UploadQuestionComponent
			},
			{
				path: '**',
				component: NotFoundComponent
			}
		]
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
