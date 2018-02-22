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
import { from } from 'rxjs/observable/from';
import { DemoComponent } from './demo/demo/demo.component';
import { SampleEffects } from './effects/sample.effects';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { HomeContentComponent } from './admin/home-content/home-content.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SampleQuestionComponent } from './user/sample-question/sample-question.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    MainContentComponent,
    DemoComponent,
    UserLandingComponent,
    AdminLandingComponent,
    HomeContentComponent,
    NotFoundComponent,
    SampleQuestionComponent
  ],
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