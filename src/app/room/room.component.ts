import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent {
	socket = io('http://localhost:3000', {forceNew: true});
	peer: any;

	roomId = window.location.pathname.split('/')[2];
	admin = window.location.href.indexOf('admin') > -1;
	name = window.location.href.split('?name=')[1];

	quiz = [] as any;
	answers = [] as any;
	file: any;
	stream = true;
	draw = false;

	ngOnInit() {
		// COMMON REQUESTS
		this.socket.on('connect', () => {

			// send basic data to server
			this.socket.emit('join-room', this.roomId, this.name);
			
			// send who connected to admin socket
			this.socket.emit('user-connected', this.roomId);

			// init Peer
			this.peer = new Peer(this.socket.id); // have peerId be equal to socketId

			// PEER REQUESTS (screen sharing)
			// if admin starts streaming respond to their call
			this.peer.on('call', (call: any) => {
				call.answer();

				// and show their stream
				call.on('stream', (stream: any) => {
					this.addVideoStream(stream);
				});
			});
		});

		// ADMIN REQUESTS
		this.socket.on('get-answers', (name, answers) => {
			for (let i = 0; i < answers.length; i++) {
				this.answers[i].push(answers[i]);
			}
		});

		// GUEST REQUESTS
		this.socket.on('get-quiz', quiz => {
			this.clear();
			this.quiz = quiz;
			
			// wait until quiz is initialized
			setTimeout(() => {
				// enable quiz interaction
				let quizContainer = document.getElementById('quiz-form');
				quizContainer!.style.pointerEvents = 'auto';

				let submitButton = document.getElementById('quiz-submit');
				submitButton!.style.backgroundColor = '#4CAF50';
			}, 100);
		});

		this.socket.on('get-pdf', pdf => {
			this.clear();
			let fileDisplay = document.getElementById('fileContainer');
			let blob = new Blob([pdf], { type: 'application/pdf' });
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				fileDisplay!.innerHTML = `<embed id='viewPDF' src='${reader.result}' width='800' height='600' type='application/pdf'>`;
			}
		});
		
		this.socket.on('get-image', image => {
			this.clear();
			let fileDisplay = document.getElementById('fileContainer');
			let blob = new Blob([image]);
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				fileDisplay!.innerHTML = `<img id='viewImg' src='${reader.result}' width='800' height='600'>`;
			}
		});

		// on tab/browser close
		window.onbeforeunload = () => {
			if (this.admin) {
				this.stopRoom();
			}
			else {
				this.leaveRoom();
			}
		}
	}

	// ADMIN FUNCTIONS
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
			this.socket.emit('send-quiz', this.roomId, this.quiz);

			// set answers array
			for (let i = 0; i < this.quiz.length; i++) {
				this.answers.push([]);
			}
		}, 100);
	}

	uploadFile(event: any) {
		this.file = event.target.files[0];
		let src = URL.createObjectURL(event.target.files[0]);

		let fileDisplay = document.getElementById('fileContainer');
		let fileType = event.target.files[0].type;

		if (fileType == 'application/pdf') {
			fileDisplay!.innerHTML = `<iframe id='viewPDF' src='${src}' width='800' height='600'>`;
		}

		else if (fileType.includes('image')) {
			fileDisplay!.innerHTML = `<img id='viewImg' src='${src}' width='800' height='600'>`;
		}

		else {
			alert(`File type ${fileType} is not supported. Please convert to pdf or image and try again.`);
		}
	}

	sendFile() {
		if (this.file) {
			if (this.file.type == 'application/pdf') {
				this.socket.emit('send-pdf', this.roomId, this.file);
			}
			else if (this.file.type.includes('image')) {
				this.socket.emit('send-image', this.roomId, this.file);
			}
			else {
				alert(`File type ${this.file.type} is not supported. Please convert to pdf or image and try again.`);
			}
		}
		else {
			alert('No file found. Please upload a file in order to send it.');
		}
	}

	shareScreen() {
		navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: false
		}).then(stream => {
			// get all connected users ids
			this.socket.emit('fetch-users', this.roomId);

			this.socket.on('get-users', userIds => {
				for (let userId of userIds) {
					// and connect to them with p2p
					this.peer.call(userId, stream);
				}
			});
		});
	}

	toggleStream() {
		this.stream = !this.stream;
		console.log('stream playing: ' + this.stream) // to do
	}

	toggleDraw() {
		this.draw = !this.draw;
	}

	stopRoom() {
		this.socket.emit('stop-room', this.roomId);
	}

	// GUEST FUNCTIONS
	sendQuestion() {
		this.socket.emit('send-question', this.roomId);
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
		this.socket.emit('send-answers', this.roomId, quizAnswers);

		// disable quiz interaction after submitting
		let quizContainer = document.getElementById('quiz-form');
		quizContainer!.style.pointerEvents = 'none';

		let submitButton = document.getElementById('quiz-submit');
		submitButton!.style.backgroundColor = 'rgb(150, 150, 150)';
	}

	leaveRoom() {
		// send who disconnected to admin socket
		this.socket.emit('user-disconnected', this.roomId);
	}

	// HELPER FUNCTIONS
	clear() {
		this.quiz = [];
		let videoContainer = document.getElementById('videoContainer');
		if (videoContainer) videoContainer.innerHTML = "";
		let fileContainer = document.getElementById('fileContainer');
		if (fileContainer) fileContainer.innerHTML = "";
		this.draw = false;
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

	// add and play video element
	addVideoStream(stream: any) {
		let video = document.createElement('video');
		video.srcObject = stream;
		video.addEventListener('loadedmetadata', () => {
			video.play();
		});
		document.getElementById('videoContainer')?.append(video);
	}
}
