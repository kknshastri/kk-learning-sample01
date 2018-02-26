import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContentComponent } from './main-content/main-content.component';
import { DemoComponent } from './demo/demo/demo.component';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { HomeContentComponent } from './admin/home-content/home-content.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { ManageQuestionsComponent } from './admin/manage-questions/manage-questions.component';
import { ManageSectionsComponent } from './admin/manage-sections/manage-sections.component';
import { ManageQuestionnaireComponent } from './admin/manage-questionnaire/manage-questionnaire.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'dashboard',
    component: UserLandingComponent
  },
  {
    path: 'adminDashboard',
    component: AdminLandingComponent,
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
