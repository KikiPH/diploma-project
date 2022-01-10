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
		console.log('User name:', this.name);
		console.log('Room:', this.roomId);
	}

	startRoom() {
		let roomIds = localStorage.getItem('roomIds')!.split('/');
		if (roomIds.length === 0) {
			roomIds = [this.roomId];
			this.isRoom = true;
		}
		else if (roomIds.includes(this.roomId)) {
			this.isRoom = false;
			alert('Room already exists.');
			return;
		}
		else {
			roomIds.push(this.roomId);
			this.isRoom = true;
		}

		localStorage.setItem('roomIds', roomIds.join('/'));
	}

	checkRoom() {
		let roomIds = localStorage.getItem('roomIds')!.split('/');
		if (roomIds.includes(this.roomId)) {
			this.isRoom = true;
		}
		else {
			this.isRoom = false;
			alert('Invalid room number.');
			return;
		}
	}
}
