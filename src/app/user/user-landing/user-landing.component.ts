import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';


@Component({
	selector: 'app-user-landing',
	templateUrl: './user-landing.component.html',
	styleUrls: ['./user-landing.component.scss']
})
export class UserLandingComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
