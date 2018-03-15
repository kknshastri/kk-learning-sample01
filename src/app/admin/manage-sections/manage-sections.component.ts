import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as adminActions from '../../action/admin-actions';


@Component({
	selector: 'app-manage-sections',
	templateUrl: './manage-sections.component.html',
	styleUrls: ['./manage-sections.component.scss']
})
export class ManageSectionsComponent implements OnInit {

	constructor(private store: Store<any>) {
		this.store.dispatch({ type: adminActions.SIDEMENU_SELECTED, payload: 'Sections' });
	}

	ngOnInit() {
	}

}
