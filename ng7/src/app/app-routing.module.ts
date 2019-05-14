import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componants/home/home.component'
import { ContactComponent } from './componants/contact/contact.component'
import { NewsComponent } from './componants/news/news.component'
import { ComplaintsComponent } from './componants/complaints/complaints.component'
import { AdminComponent } from './componants/admin/admin.component'
const routes: Routes = [
  { path : '', component: HomeComponent},
  { path : 'home', component: HomeComponent},
  { path : 'contact', component: ContactComponent},
  { path : 'news', component: NewsComponent},
  { path : 'complaints', component: ComplaintsComponent},
  { path : 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
