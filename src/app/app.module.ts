import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { RoomComponent } from './room/room.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
    	QuizBuilderComponent,
		RoomComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	exports: [
		HomeComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
