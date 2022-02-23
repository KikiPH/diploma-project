import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'admin-console',
	templateUrl: './admin-console.component.html',
	styleUrls: ['./admin-console.component.less']
})
export class AdminConsoleComponent implements OnInit {
	@Input() socket = '' as any;
	messageStyle = 1;

	ngOnInit(): void {
		this.socket.on('get-user-connected', (name: string) => {
			let users = document.getElementById('users');
			users?.append(this.customCreateElement('div', name, name));

			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, `${name} connected`));

			// clear message after 3 seconds
			this.clearMessage(id);
		});

		this.socket.on('get-user-disconnected', (name: string) => {
			let user = document.getElementById(name);
			user!.textContent = '';

			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, `${name} disconnected`));

			this.clearMessage(id);
		});

		this.socket.on('get-question', (name: string) => {
			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, `${name} has a question`));

			this.clearMessage(id);
		});

		this.socket.on('get-quiz-status', () => {
			let id = 'quiz';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, 'Quiz uploaded.'));

			this.clearMessage(id);
		});

		this.socket.on('get-pdf-status', () => {
			let id = 'pdf';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, 'PDF shared with users.'));

			this.clearMessage(id);
		});

		this.socket.on('get-image-status', () => {
			let id = 'image';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, 'Image shared with users.'));

			this.clearMessage(id);
		});

		this.socket.on('get-start-stream', () => {
			let id = 'start';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, 'Stream started.'));

			this.clearMessage(id);

			id = 'stream';
			status?.append(this.customCreateElement('div', id, 'Streaming...'));
		});

		this.socket.on('get-stream-status', (stream: boolean) => {
			// clear any previous message
			this.clearMessage('stream', 0);

			setTimeout(() => {
				// currently running
				if (stream) {
					let id = 'stream';
					let status = document.getElementById('status');
					status?.append(this.customCreateElement('div', id, 'Streaming...'));
				}
				// currently paused
				else if (!stream) {
					let id = 'stream';
					let status = document.getElementById('status');
					status?.append(this.customCreateElement('div', id, 'Stream paused...'));
				}
			}, 100);
		});

		this.socket.on('get-stop-stream', () => {
			let id = 'stop';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', id, 'Stream stopped.'));

			this.clearMessage(id);

			id = 'stream';
			this.clearMessage(id);
		});
	}

	customCreateElement(tag: string, id: string, text: string) {
		let e = document.createElement(tag);
		e.id = id;

		// alternate message background colors
		if (this.messageStyle == 1) {
			e.setAttribute('style', 'padding-left: 5px; background-color: #91B493;')
			this.messageStyle = 2;
		}
		else {
			e.setAttribute('style', 'padding-left: 5px; background-color: #82A284')
			this.messageStyle = 1;
		}
		e.textContent = text;
		return e;
	}

	clearMessage(id: string, timeout: number = 3000) {
		setTimeout(() => {
			let message = document.getElementById(id);
			message?.remove();
		}, timeout);
	}
}
