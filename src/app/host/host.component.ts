import { Component } from '@angular/core';

@Component({
	selector: 'host',
	templateUrl: './host.component.html',
	styleUrls: ['./host.component.less']
})
export class HostComponent {
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
}
