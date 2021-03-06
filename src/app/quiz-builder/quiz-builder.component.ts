import { Component } from '@angular/core';

@Component({
	selector: 'app-quiz-builder',
	templateUrl: './quiz-builder.component.html',
	styleUrls: ['./quiz-builder.component.less']
})
export class QuizBuilderComponent {
	questions = [] as any;
	type = 1;

	toggleType() {
		// question type (1 - essay, 2 - single choice, 3 - multiple choice)
		let type1 = document.getElementById('type-1') as HTMLInputElement;
		let type2 = document.getElementById('type-2') as HTMLInputElement;
		let type3 = document.getElementById('type-3') as HTMLInputElement;

		if (type1.checked) {
			this.type = 1;
			return;
		}
		else if (type2.checked) {
			this.type = 2;
			return;
		}
		else if (type3.checked) {
			this.type = 3;
			return;
		}
	}

	addQuestion() {
		let title = (<HTMLInputElement>document.getElementById('add-title')).value;
		if (title == '') {
			alert('Please enter question text.');
			return;
		}

		let answer1 = (<HTMLInputElement>document.getElementById('add-answer-1')).value;
		let answer1Correct = (<HTMLInputElement>document.getElementById('toggle-answer-1')).checked;

		let answer2 = (<HTMLInputElement>document.getElementById('add-answer-2')).value;
		let answer2Correct = (<HTMLInputElement>document.getElementById('toggle-answer-2')).checked;

		let answer3 = (<HTMLInputElement>document.getElementById('add-answer-3')).value;
		let answer3Correct = (<HTMLInputElement>document.getElementById('toggle-answer-3')).checked;

		let answer4 = (<HTMLInputElement>document.getElementById('add-answer-4')).value;
		let answer4Correct = (<HTMLInputElement>document.getElementById('toggle-answer-4')).checked;

		let question = {
			title: title,
			answers: [
				{ text: answer1, correct: answer1Correct },
				{ text: answer2, correct: answer2Correct },
				{ text: answer3, correct: answer3Correct },
				{ text: answer4, correct: answer4Correct },
			],
			type: this.type
		};
		this.questions.push(question);

		let form = <HTMLFormElement>document.getElementById('add-form');
		form.reset();
		this.toggleType();
	}

	removeQuestion(i: number) {
		this.questions.splice(i, 1);
	}

	downloadQuiz() {
		var sJson = JSON.stringify(this.questions);
		var element = document.createElement('a');
		element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));

		let fileName =  (<HTMLInputElement>document.getElementById('quiz-title')).value;
		if (fileName.length == 0) fileName = 'quiz';
		element.setAttribute('download', `${fileName}.json`);
		element.style.display = 'none';

		document.body.appendChild(element);
		element.click(); // simulate click
		document.body.removeChild(element);
	}

	uploadQuiz(event: any) {
		if (event.target.files.length !== 1) {
			console.error('No file selected');
		} else {
			const reader = new FileReader();
			reader.onloadend = (e) => {

				// handle data processing
				let content: string = e.target?.result?.toString()!;
				let quiz = JSON.parse(content);
				this.questions = quiz;
			};
			reader.readAsText(event.target.files[0]);
		}
	}
}
