import { Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent{
	name: string;
	roomId: string;
	isUser: boolean = false;
	isRoom: boolean = false;

	setUser() {
		let name = (<HTMLInputElement>document.getElementById('name')).value;
		if (!name) {
			alert('Please enter your name.');
			return;
		}

		let id = (<HTMLInputElement>document.getElementById('room-id')).value;
		if (!id) {
			alert('Please input room number.');
			return;
		}

		this.name = name;
		this.roomId = id;
		this.isUser = true;
	}

	startRoom() {
		let room = localStorage.getItem(`room${this.roomId}`);

		// room doesn't exist
		if (!room) {
			localStorage.setItem(`room${this.roomId}`, '');
			this.isRoom = true;
		}
		// room already exists
		else {
			alert('Room already exists.');
			return;
		}
	}

	checkRoom() {
		let room = localStorage.getItem(`room${this.roomId}`);

		if (room) {
			this.isRoom = true;
		}
		else {
			this.isRoom = false;
			alert('Invalid room number.');
			return;
		}
	}
}
