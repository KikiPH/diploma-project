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
			setTimeout(() => {
				let message = document.getElementById(id);
				message!.textContent = '';
			}, 3000);
		});

		this.socket.on('get-user-disconnected', (name: string) => {
			let user = document.getElementById(name);
			user!.textContent = '';

			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, `${name} disconnected`));

			// clear message after 3 seconds
			setTimeout(() => {
				let message = document.getElementById(id);
				message!.textContent = '';
			}, 3000);
		});

		this.socket.on('get-question', (name: string) => {
			let id = new Date().getTime().toString();
			let status = document.getElementById('status');
			status?.append(this.customCreateElement('div', {'id': id, 'style': 'padding-left: 5px;'}, `${name} has a question`));

			// clear message after 3 seconds
			setTimeout(() => {
				let message = document.getElementById(id);
				message!.textContent = '';
			}, 3000);
		})
	}

	customCreateElement(tag: string, attributes: any, text: string) {
		let e = document.createElement(tag);
		for (let a in attributes) {
			e.setAttribute(a, attributes[a]);
		}
		e.textContent = text;
		return e;
	}
}
