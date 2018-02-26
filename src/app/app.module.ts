import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppState, INIT_STATE, rootReducer } from './store/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftSidebarComponent } from './common/left-sidebar/left-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { QuestionService } from './services/question.service';
import { DemoComponent } from './demo/demo/demo.component';
import { SampleEffects } from './effects/sample.effects';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { HomeContentComponent } from './admin/home-content/home-content.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SampleQuestionComponent } from './user/sample-question/sample-question.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { ManageQuestionsComponent } from './admin/manage-questions/manage-questions.component';
import { ManageSectionsComponent } from './admin/manage-sections/manage-sections.component';
import { ManageSetsComponent } from './admin/manage-sets/manage-sets.component';
import { TitlebarSectionComponent } from './admin/titlebar-section/titlebar-section.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { ManageQuestionnaireComponent } from './admin/manage-questionnaire/manage-questionnaire.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

const appDeclarations: any = [
  AppComponent, HeaderComponent, FooterComponent, LeftSidebarComponent, MainContentComponent,
  DemoComponent, UserLandingComponent, AdminLandingComponent, HomeContentComponent,
  NotFoundComponent, SampleQuestionComponent, AdminSidebarComponent, ManageQuestionsComponent,
  ManageSectionsComponent, ManageSetsComponent, TitlebarSectionComponent, AdminHeaderComponent
];

@NgModule({
  declarations: [...appDeclarations, ManageQuestionnaireComponent, ManageUsersComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({rootReducer: rootReducer}),
    EffectsModule.forRoot([ SampleEffects ])
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
