import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
  		HostComponent
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
