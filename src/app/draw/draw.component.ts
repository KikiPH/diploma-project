import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'draw',
	templateUrl: './draw.component.html',
	styleUrls: ['./draw.component.less']
})
export class DrawComponent implements OnInit {
	canvas: HTMLCanvasElement;
	context: any;
	
	width = 0;
	height = 0;
	flag = false;
	dotFlag = false;

	prevX = 0;
	prevY = 0;
	currX = 0;
	currY = 0;

	colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];
	color = 'black';
	types = ['default', 'line', 'arrow', 'rectangle'];
	type = 'default';
	strokes = [
		{ 'type': 'small', 'size': 2 },
		{ 'type': 'medium', 'size': 5 },
		{ 'type': 'large', 'size': 10 }
	];
	stroke = 2;
	highlight = false;

	// setup
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

	// helper functions
	changeColor(c: any) {
		this.color = c;
	}

	changeType(t: any) {
		this.type = t;
	}

	changeStroke() {
		let option = document.getElementById('strokeSelect') as HTMLSelectElement;
		let i = option.selectedIndex;
		this.stroke = this.strokes[i].size;
	}

	toggleHighlight() {
		if (!this.highlight) {
			this.context.globalAlpha = 0.4;
			this.highlight = true;
		}
		else {
			this.context.globalAlpha = 1;
			this.highlight = false;
		}
	}


	// draw functions
	draw() {
		if (this.context) {
			this.context.beginPath();
			this.context.moveTo(this.prevX, this.prevY);
			this.context.lineTo(this.currX, this.currY);
			this.context.strokeStyle = this.color;
			this.context.lineWidth = this.stroke;
			this.context.stroke();
			this.context.closePath();
		}
	}

	drawLine() {
		this.context.moveTo(this.prevX, this.prevY);
		this.context.lineTo(this.currX, this.currY);
		
		this.context.strokeStyle = this.color;
		this.context.lineWidth = this.stroke;
		this.context.stroke();
	}

	drawArrow() {
		let headLength = 10;
		let dX = this.currX - this.prevX;
		let dY = this.currY - this.prevY;
		let angle = Math.atan2(dY, dX);

		this.context.moveTo(this.prevX, this.prevY);
		this.context.lineTo(this.currX, this.currY);
		this.context.lineTo(this.currX - headLength * Math.cos(angle - Math.PI / 6), this.currY - headLength * Math.sin(angle - Math.PI / 6));
		this.context.moveTo(this.currX, this.currY);
		this.context.lineTo(this.currX - headLength * Math.cos(angle + Math.PI / 6), this.currY - headLength * Math.sin(angle + Math.PI / 6));
		
		this.context.strokeStyle = this.color;
		this.context.lineWidth = this.stroke;
		this.context.stroke();
	}

	drawRectangle() {
		let dX = this.currX - this.prevX;
		let dY = this.currY - this.prevY;
		
		this.context.strokeStyle = this.color;
		this.context.lineWidth = this.stroke;
		this.context.strokeRect(this.prevX, this.prevY, dX, dY);
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
				this.context.fillRect(this.currX, this.currY, this.stroke, this.stroke);
				this.context.closePath();
				this.dotFlag = false;
			}
		}

		if (res == 'up' || res == "out") {
			// other types (draw from mouse down position to mouse up position)
			if (res == 'up' && this.type != 'default' && this.type != 'highlight') {
				this.prevX = this.currX;
				this.prevY = this.currY;
				this.currX = e.clientX - this.canvas.offsetLeft;
				this.currY = e.clientY - this.canvas.offsetTop;

				switch (this.type) {
					case 'line':
						this.drawLine();
						break;
						
					case 'arrow':
						this.drawArrow();
						break;

					case 'rectangle':
						this.drawRectangle();
						break;
				}
			}

			this.flag = false;
		}

		if (res == 'move') {
			// default type (draw every movement)
			if (this.type == 'default') {
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
}
