import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'draw',
	templateUrl: './draw.component.html',
	styleUrls: ['./draw.component.less']
})
export class DrawComponent implements OnInit {
	canvas: HTMLCanvasElement;
	context: any;
	flag = false;
	dotFlag = false;

	prevX = 0;
	prevY = 0;
	currX = 0;
	currY = 0;

	colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];
	color = 'black';
	width = 0;
	height = 0;

	ngOnInit(): void {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.canvas.addEventListener("mousemove", (e) => {
			this.findXY('move', e)
		});

		this.canvas.addEventListener("mousedown", (e) => {
			this.findXY('down', e)
		});

		this.canvas.addEventListener("mouseup", (e) => {
			this.findXY('up', e)
		});

		this.canvas.addEventListener("mouseout", (e) => {
			this.findXY('out', e)
		});
	}

	changeColor(c: any) {
		this.color = c;
	}

	draw() {
		if (this.context) {
			this.context.beginPath();
			this.context.moveTo(this.prevX, this.prevY);
			this.context.lineTo(this.currX, this.currY);
			this.context.strokeStyle = this.color;
			this.context.lineWidth = 2;
			this.context.stroke();
			this.context.closePath();
		}
	}

	clear() {
		if (this.context) {
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}

	findXY(res: any, e: any) {
		if (res == 'down') {
			this.prevX = this.currX;
			this.prevY = this.currY;
			this.currX = e.clientX - this.canvas.offsetLeft;
			this.currY = e.clientY - this.canvas.offsetTop;

			this.flag = true;
			this.dotFlag = true;
			if (this.dotFlag && this.context) {
				this.context.beginPath();
				this.context.fillStyle = this.color;
				this.context.fillRect(this.currX, this.currY, 2, 2);
				this.context.closePath();
				this.dotFlag = false;
			}
		}
		if (res == 'up' || res == "out") {
			this.flag = false;
		}
		if (res == 'move') {
			if (this.flag) {
				this.prevX = this.currX;
				this.prevY = this.currY;
				this.currX = e.clientX - this.canvas.offsetLeft;
				this.currY = e.clientY - this.canvas.offsetTop;
				this.draw();
			}
		}
	}
}
