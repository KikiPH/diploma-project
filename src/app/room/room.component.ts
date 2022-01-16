import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
	socket = io('http://localhost:3000');

	quiz = [] as any;
	roomId = window.location.pathname.split('/')[2];
	admin = window.location.href.indexOf('admin') > -1;

	ngOnInit() {
		this.socket.on('connect', () => {
			console.log(`You connected with id: ${this.socket.id}`);
			this.socket.emit('user-joined', this.socket.id);
		});

		this.socket.on('get-user-joined', id => {
			const div = document.createElement('div');
			div.textContent = `User with id ${id} connected`;

			let adminConsole = document.getElementById('admin-console');
			adminConsole?.append(div);
		});

		this.socket.on('get-quiz', quiz => {
			this.quiz = quiz;
		});
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
			this.socket.emit('send-quiz', this.quiz);
		}, 100);
	}

	uploadFile(event: any) {
		let src = URL.createObjectURL(event.target.files[0]);

		let fileDisplay = document.getElementById('viewFile');
		let fileType = event.target.files[0].type;

		if (fileType == 'application/pdf') {
			fileDisplay!.innerHTML = `<embed id='viewPDF' src='${src}' width='800' height='600' type='application/pdf'>`;
		}

		// not working
		else if (fileType == 'application/vnd.ms-powerpoint') {
			fileDisplay!.innerHTML = `<iframe src='${src}' width='100%' height='600px' frameborder='0'>`;
		}

		else if (fileType.includes('image')) {
			fileDisplay!.innerHTML = `<img src='${src}' width='800' height='600'>`;
		}

		else {
			console.log(`File type ${fileType} is not supported.`);
		}
	}

	stopRoom() {
		let roomIds = localStorage.getItem('roomIds')!.split('/');
		roomIds = roomIds.filter(room => room != this.roomId);
		localStorage.setItem('roomIds', roomIds.join('/'));
	}
}
