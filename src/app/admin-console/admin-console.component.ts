import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'admin-console',
	templateUrl: './admin-console.component.html',
	styleUrls: ['./admin-console.component.less']
})
export class AdminConsoleComponent implements OnInit {
	@Input() socket = '' as any;

	ngOnInit(): void {
		this.socket.on('get-user-connected', (name: string) => {
			let users = document.getElementById('users');
			users?.append(this.customCreateElement('div', {'id': name, 'style': 'padding-left: 5px;'}, name));

			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, `${name} connected`));

			// clear message after 3 seconds
			this.clearMessage(id);
		});

		this.socket.on('get-user-disconnected', (name: string) => {
			let user = document.getElementById(name);
			user!.textContent = '';

			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, `${name} disconnected`));

			this.clearMessage(id);
		});

		this.socket.on('get-question', (name: string) => {
			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, `${name} has a question`));

			this.clearMessage(id);
		});

		this.socket.on('get-quiz-status', () => {
			let id = 'quiz';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Quiz uploaded.'));

			this.clearMessage(id);
		});

		this.socket.on('get-pdf-status', () => {
			let id = 'pdf';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'PDF shared with users.'));

			this.clearMessage(id);
		});

		this.socket.on('get-image-status', () => {
			let id = 'image';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Image shared with users.'));

			this.clearMessage(id);
		});

		this.socket.on('get-start-stream', () => {
			let id = 'start';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Stream started.'));

			this.clearMessage(id);

			id = 'stream';
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Streaming...'));
		});

		this.socket.on('get-stream-status', (stream: boolean) => {
			// clear any previous message
			this.clearMessage('stream', 0);

			setTimeout(() => {
				// currently running
				if (stream) {
					let id = 'stream';
					let status = document.getElementById('status');
					status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Streaming...'));
				}
				// currently paused
				else if (!stream) {
					let id = 'stream';
					let status = document.getElementById('status');
					status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Stream paused...'));
				}
			}, 100);
		});

		this.socket.on('get-stop-stream', () => {
			let id = 'stop';
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, 'Stream stopped.'));

			this.clearMessage(id);

			id = 'stream';
			this.clearMessage(id);
		});
	}

	customCreateElement(tag: string, attributes: any, text: string) {
		let e = document.createElement(tag);
		for (let a in attributes) {
			e.setAttribute(a, attributes[a]);
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
