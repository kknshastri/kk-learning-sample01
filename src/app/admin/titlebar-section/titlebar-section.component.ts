import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-titlebar-section',
  templateUrl: './titlebar-section.component.html',
  styleUrls: ['./titlebar-section.component.scss']
})
export class TitlebarSectionComponent implements OnInit {

  selectedSidebarMenu: Observable<string>;

  constructor(private store: Store<any>) {
    this.selectedSidebarMenu = store.pipe(
      select((s) => s.rootReducer.adminStates.selectedSidebarMenu)
    );
  }

  ngOnInit() {
  }

}
