import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { DemoComponent } from './demo/demo/demo.component';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { HomeContentComponent } from './admin/home-content/home-content.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { ManageSetsComponent } from './admin/manage-sets/manage-sets.component';
import { RelationshipViewsComponent } from './admin/relationship-views/relationship-views.component';
import { ManageSectionsComponent } from './admin/manage-sections/manage-sections.component';
import { ManageQuestionsComponent } from './admin/manage-questions/manage-questions.component';

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
        // component: HomeContentComponent
        component: ManageSetsComponent
      },
      {
        path: 'home',
        component: HomeContentComponent
      },
      {
        path: 'manageSets',
        component: ManageSetsComponent
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
        path: 'relationView',
        component: RelationshipViewsComponent
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
