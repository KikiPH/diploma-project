import { Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent{

	joinRoom() {
		let id = (<HTMLInputElement>document.getElementById('room-id')).value;
		console.log('Join room:', id);
	}

	hostRoom() {
		let id = (<HTMLInputElement>document.getElementById('room-id')).value;
		console.log('Host room:', id);
	}
}
