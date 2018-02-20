import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { DemoComponent } from './demo/demo/demo.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
