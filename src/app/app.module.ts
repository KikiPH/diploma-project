import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { RoomComponent } from './room/room.component';
import { DrawComponent } from './draw/draw.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
    	QuizBuilderComponent,
		RoomComponent,
  		DrawComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	exports: [
		HomeComponent,
		DrawComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
