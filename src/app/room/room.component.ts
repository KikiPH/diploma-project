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
	answers = [] as any;
	shareScreen = true;
	sendFile = true;
	video = false; // toggle video element visibility
	draw = false;

	ngOnInit() {
		// COMMON REQUESTS
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
			this.socket.emit('user-connected', this.name, this.adminSocketId);
		});

		// ADMIN REQUESTS
		this.socket.on('get-answers', (name, answers) => {
			for (let i = 0; i < answers.length; i++) {
				this.answers[i].push(answers[i]);
			}
		})

		// GUEST REQUESTS
		this.socket.on('get-quiz', quiz => {
			this.clear();
			this.quiz = quiz;
			
			// enable quiz interaction
			let quizContainer = document.getElementById('quiz-form');
			quizContainer!.style.pointerEvents = 'auto';

			let submitButton = document.getElementById('quiz-submit');
			submitButton!.style.backgroundColor = '#4CAF50';
		});

		this.socket.on('get-pdf', pdf => {
			this.clear();
			let fileDisplay = document.getElementById('viewFile');
			let blob = new Blob([pdf], { type: 'application/pdf' });
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				fileDisplay!.innerHTML = `<embed id='viewPDF' src='${reader.result}' width='800' height='600' type='application/pdf'>`;
			}
		});

		this.socket.on('get-video', arrayBuffer => {
			this.video = true; // show video field

			let blob = new Blob([arrayBuffer]);
			let videoDisplay = document.getElementById('viewVideo') as HTMLVideoElement;
			videoDisplay.src = window.URL.createObjectURL(blob);
			videoDisplay.muted = true;
			videoDisplay.play();
		});
		
		this.socket.on('get-image', image => {
			this.clear();
			let fileDisplay = document.getElementById('viewFile');
			let blob = new Blob([image]);
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				fileDisplay!.innerHTML = `<img id='viewImg' src='${reader.result}' width='800' height='600'>`;
			}
		});

		// for debugging purposes
		/*setInterval(() => {
			let room = localStorage.getItem(`room${this.roomId}`);
			let [admin, users] = room!.split(':');
			console.log('Admin:', admin);
			console.log('Users:', users);
		}, 3000);*/

		// on tab/browser close
		window.onbeforeunload = () => {
			if(this.admin) {
				this.stopRoom();
			}
			else {
				this.leaveRoom();
			}
		}
	}

	// ADMIN FUNCTIONS
	upload(event: any) {
		this.clear();

		let fileType = event.target.files[0].type;
		if (fileType == 'application/json') {
			this.uploadQuiz(event);
		}
		else {
			this.uploadFile(event);
		}
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

		// wait until quiz is initialized
		setTimeout(() => {
			
			// send quiz to all connected users
			this.socket.emit('send-quiz', this.quiz, this.getUsers());

			// set answers array
			for (let i = 0; i < this.quiz.length; i++) {
				this.answers.push([]);
			}
		}, 100);
	}

	uploadFile(event: any) {
		let src = URL.createObjectURL(event.target.files[0]);

		let fileDisplay = document.getElementById('viewFile');
		let fileType = event.target.files[0].type;

		if (fileType == 'application/pdf') {
			fileDisplay!.innerHTML = `<iframe id='viewPDF' src='${src}' width='800' height='600'>`;
			if (this.sendFile) {
				this.socket.emit('send-pdf', event.target.files[0], this.getUsers());
			}
			
			if (this.shareScreen) {
				let chunks: any = [];
				let constraints = { audio: false, video: { width: 800, height: 600 } };
				navigator.mediaDevices.getDisplayMedia(constraints).then((stream: any) => {
					let mediaRecorder = new MediaRecorder(stream);
					mediaRecorder.onstart = () => {
						chunks = [];
					};
					mediaRecorder.ondataavailable = e => {
						chunks.push(e.data);
					};
					mediaRecorder.onstop = () => {
						let blob = new Blob(chunks);
						this.socket.emit('send-video', blob, this.getUsers());
					}
					mediaRecorder.start();

					setInterval(() => {
						mediaRecorder.stop();
						mediaRecorder.start();
					}, 500); // smaller timeout -> less delay but more flickering
				});
			}
		}

		else if (fileType.includes('image')) {
			fileDisplay!.innerHTML = `<img id='viewImg' src='${src}' width='800' height='600'>`;
			this.socket.emit('send-image', event.target.files[0], this.getUsers());
		}

		else {
			alert(`File type ${fileType} is not supported. Please convert to pdf or image and try again.`);
		}
	}

	stopRoom() {
		localStorage.removeItem(`room${this.roomId}`);
	}

	// GUEST FUNCTIONS
	sendQuestion() {
		this.socket.emit('send-question', this.name, this.adminSocketId);
	}

	submitQuiz() {
		let quizAnswers = [];
		for (let i = 0; i < this.quiz.length; i++) {

			// essay
			if (this.quiz[i].type == 1) {
				let question = document.getElementsByClassName(`question${i + 1}`);
				let answer = question[0] as HTMLInputElement;
				quizAnswers.push([answer.value]);
			}

			// single or multiple choice
			else {
				let question = document.getElementsByClassName(`question${i + 1}`);
				let options = question;
				let answers = [];

				for (let j = 0; j < options.length; j++) {
					let option = options[j] as HTMLInputElement;
					if (option.checked) {
						answers.push(option.value);
					}
				}
				quizAnswers.push(answers);
			}
		}
		this.socket.emit('send-answers', this.name, quizAnswers, this.adminSocketId);

		// disable quiz interaction after submitting
		let quizContainer = document.getElementById('quiz-form');
		quizContainer!.style.pointerEvents = 'none';

		let submitButton = document.getElementById('quiz-submit');
		submitButton!.style.backgroundColor = 'rgb(150, 150, 150)';
	}

	leaveRoom() {
		// remove user from connected users in localStorage
		let room = localStorage.getItem(`room${this.roomId}`);
		let [admin, users] = room!.split(':');
		users = users.replace(this.userSocketId, '');
		localStorage.setItem(`room${this.roomId}`, `${admin}:${users}`);

		// send who disconnected to admin socket
		this.socket.emit('user-disconnected', this.name, this.adminSocketId);
	}

	// HELPER FUNCTIONS
	clear() {
		this.quiz = [];
		let viewVideo = document.getElementById('viewVideo');
		if (viewVideo) viewVideo.innerHTML = "";
		let viewFile = document.getElementById('viewFile');
		if (viewFile) viewFile.innerHTML = "";
		this.video = false;
		this.draw = false;
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
		return users ? users.split(',') : [];
	}

	toggleShareScreen() {
		this.shareScreen = !this.shareScreen;
	}

	toggleSendFile() {
		this.sendFile = !this.sendFile;
	}

	toggleDraw() {
		this.draw = !this.draw;
	}

	getAnswerPercentage(questionId: number, answerId: number) {
		// if no one submitted their quiz answers do nothing
		if (!this.answers[questionId] || this.answers[questionId].length == 0) return '';

		let currentAnswer = this.quiz[questionId].answers[answerId].text;
		let count = 0;

		// go over all submitted answers (users)
		// only check answers for current question
		for (let userAnswers of this.answers[questionId]) {

			// check all answers from user (multipick questions can have multiple options checked)
			for (let answer of userAnswers) {

				// count how many users picked this answer option
				if (answer == currentAnswer) {
					count += 1;
				}
			}
		}

		// calculate percentage
		let numUsers = this.answers[questionId].length;
		let percentage = (count * 100) / numUsers;

		// return pick percentage of this answer option
		return `${percentage}% [${count}/${numUsers}]`;
	}
}
