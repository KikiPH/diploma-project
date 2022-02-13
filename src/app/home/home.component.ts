import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent {
	// throwaway socket for checking rooms on server
	socket = io('http://localhost:3000');

	name: string;
	roomId: string;
	isUser: boolean = false;
	isRoom: boolean = false;

	ngOnInit() {
		this.socket.on('get-start-room', (start) => {
			if (start) {
				this.isRoom = true;
				// have to wait for correct server response, then simulate button click again
				document.getElementById('admin-room')?.click();
			}
			else {
				alert('Room already exists.');
			}
		});

		this.socket.on('get-check-room', (room) => {
			if (room) {
				this.isRoom = true;
				document.getElementById('guest-room')?.click();
			}
			else {
				this.isRoom = false;
				alert('Invalid room number.');
			}
		});
	}

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
		this.socket.emit('start-room', this.roomId);
	}

	checkRoom() {
		this.socket.emit('check-room', this.roomId);
	}
}
