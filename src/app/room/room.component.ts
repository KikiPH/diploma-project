import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
	socket = io('http://localhost:3000');

	roomId = window.location.pathname.split('/')[2];
	admin = window.location.href.indexOf('admin') > -1;
	name = window.location.href.split('?name=')[1];
	adminSocketId = '';
	userSocketId = '';

	quiz = [] as any;

	ngOnInit() {
		this.socket.on('connect', () => {

			// if new room save admins socket id to it's corresponding room in localStorage
			if (this.admin) {
				let room = localStorage.getItem(`room${this.roomId}`);
				room = `${this.socket.id}`;
				localStorage.setItem(`room${this.roomId}`, room!);

				this.adminSocketId = this.socket.id;
				this.userSocketId = this.socket.id;
			}
			// if joining a room, get admin socket id
			else {
				this.adminSocketId = this.getAdmin();
				this.userSocketId = this.socket.id;

				// and append your id to rooms users list
				let room = localStorage.getItem(`room${this.roomId}`);
				let users = room!.split(':')[1];
				if (users) {
					room += `,${this.userSocketId}`;
				}
				else {
					room += `:${this.userSocketId}`;
				}

				localStorage.setItem(`room${this.roomId}`, room!);
			}
			
			// send who connected to admin socket
			this.socket.emit('user-joined', this.name, this.adminSocketId);
		});

		this.socket.on('get-user-joined', name => {
			const div = document.createElement('div');
			div.textContent = `${name} connected`;

			let adminConsole = document.getElementById('admin-console');
			adminConsole?.append(div);
		});

		this.socket.on('get-quiz', quiz => {
			this.quiz = quiz;
		});

		// for debugging purposes
		setInterval(() => {
			let room = localStorage.getItem(`room${this.roomId}`);
			let [admin, users] = room!.split(':');
			console.log('Admin:', admin);
			console.log('Users:', users);
		}, 3000);
	}

	upload(event: any) {
		let fileType = event.target.files[0].type;
		if (fileType == 'application/json') {
			this.uploadQuiz(event);
		}
		else {
			this.uploadFile(event);
		}
	}

	clear() {
		this.quiz = [];
		let fileDisplay = document.getElementById('viewFile');
		fileDisplay!.innerHTML = "";
	}

	uploadQuiz(event: any) {
		// read quiz questions and answers from JSON file
		const reader = new FileReader();
		reader.onloadend = (e) => {
			let content: string = e.target?.result?.toString()!;
			let q = JSON.parse(content);
			this.quiz = q;
		};
		reader.readAsText(event.target.files[0]);

		// send quiz to all connected users
		setTimeout(() => {
			this.socket.emit('send-quiz', this.quiz, this.getUsers());
		}, 100);
	}

	uploadFile(event: any) {
		let src = URL.createObjectURL(event.target.files[0]);

		let fileDisplay = document.getElementById('viewFile');
		let fileType = event.target.files[0].type;

		if (fileType == 'application/pdf') {
			fileDisplay!.innerHTML = `<embed id='viewPDF' src='${src}' width='800' height='600' type='application/pdf'>`;
		}

		else if (fileType == 'application/vnd.ms-powerpoint') {
			alert('Powerpoint file type is not supported. Please convert to pdf and try again.');
		}

		else if (fileType.includes('image')) {
			fileDisplay!.innerHTML = `<img src='${src}' width='800' height='600'>`;
		}

		else {
			alert(`File type ${fileType} is not supported. Please upload image or pdf.`);
		}
	}

	stopRoom() {
		localStorage.removeItem(`room${this.roomId}`);
	}

	leaveRoom() {
		let room = localStorage.getItem(`room${this.roomId}`);
		let [admin, users] = room!.split(':');
		users = users.replace(this.userSocketId, '');
		localStorage.setItem(`room${this.roomId}`, `${admin}:${users}`);
	}

	// returns admins socket id
	getAdmin() {
		let room = localStorage.getItem(`room${this.roomId}`);
		let admin = room!.split(':')[0];
		return admin;
	}

	// returns all connected users socket ids
	getUsers() {
		let room = localStorage.getItem(`room${this.roomId}`);
		let users = room!.split(':')[1];
		return users.split(',');
	}
}
