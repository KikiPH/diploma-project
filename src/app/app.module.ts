import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { RoomComponent } from './room/room.component';
import { DrawComponent } from './draw/draw.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
    	QuizBuilderComponent,
		RoomComponent,
  		DrawComponent,
    	AdminConsoleComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	exports: [
		HomeComponent,
		DrawComponent,
    	AdminConsoleComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
