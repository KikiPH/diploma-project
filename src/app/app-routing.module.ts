import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'room/:id', component: RoomComponent, children: [
		{ path: ':admin', component: RoomComponent }
	]},
	{ path: 'quiz-builder', component: QuizBuilderComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
