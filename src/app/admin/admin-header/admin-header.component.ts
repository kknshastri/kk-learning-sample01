import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

	adminName: Observable<string>;

	constructor(private store: Store<any>) {
		this.adminName = store.pipe(
			select((s) => s.appState.testName)
		);
	}

	ngOnInit() {
	}

}
