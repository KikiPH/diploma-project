import { Component } from '@angular/core';

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent {
	quiz = [] as any;
	roomId = window.location.pathname.split('/')[2];
	admin = window.location.href.indexOf('admin') > -1;

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
		const reader = new FileReader();
		reader.onloadend = (e) => {
			let content: string = e.target?.result?.toString()!;
			let q = JSON.parse(content);
			this.quiz = q;
		};
		reader.readAsText(event.target.files[0]);
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
