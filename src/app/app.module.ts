import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
  		HostComponent,
    	QuizBuilderComponent
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
