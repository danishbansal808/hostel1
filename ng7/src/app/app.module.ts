import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componants/nav/nav.component';
import { ContactComponent } from './componants/contact/contact.component';
import { HomeComponent } from './componants/home/home.component';
import { NewsComponent } from './componants/news/news.component';
import { ComplaintsComponent } from './componants/complaints/complaints.component';
import { AdminComponent } from './componants/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContactComponent,
    HomeComponent,
    NewsComponent,
    ComplaintsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
