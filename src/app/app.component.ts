import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';
	blockedKeyList = ['Escape', 'Meta', 'Alt', 'Control', 'F5', 'F8', 'F9', 'F10', 'F11', 'F12'];
	ngOnInit() {
	}

	onRightClick(event): boolean {
		return false;
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent): boolean {
		// console.log('key == ', event);
		// const keycode = event.keyCode || event.which;
		// const newTab = (keycode === 17 && event.code === 'KeyT') || (keycode === 91 && event.code === 'KeyT');
		// console.log('newTab', newTab);
		return ((this.blockedKeyList.indexOf(event.key) > -1) || event.ctrlKey || event.metaKey || event.altKey) ? false : true;
	}
}
