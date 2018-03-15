import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// import { INCREMENT, DECREMENT, INCREMENT_FROM_EFFECT, DECREMENT_FROM_EFFECT } from '../../action/actions';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
	}

	// loadNextQuestion() {
	//   this.store.dispatch({ type: INCREMENT });
	// }

	// loadPreviousQuestion() {
	//   this.store.dispatch({ type: DECREMENT });
	// }

	// storeDec() {
	//   this.store.dispatch({ type: DECREMENT_FROM_EFFECT });
	// }

	// storeInc() {
	//   this.store.dispatch({ type: INCREMENT_FROM_EFFECT });
	// }

}
