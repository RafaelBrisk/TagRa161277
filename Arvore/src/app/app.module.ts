import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

/* Arvore */
import {
  /* Main */
  ArvoreComponent,

  /* Components */
  NovoFilhoComponent
} from './arvore';

@NgModule({
  declarations: [
    AppComponent,
    ArvoreComponent,
    NovoFilhoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
