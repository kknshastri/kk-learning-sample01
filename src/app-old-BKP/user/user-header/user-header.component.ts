import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  userName: Observable<string>;

  constructor(private store: Store<any>) {
    this.userName = store.pipe(select((s) => s.appState.loggedInUser.name));
  }

  ngOnInit() {
  }

}
