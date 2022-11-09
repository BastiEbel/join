import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './home/board/board.component';
import { ContactsComponent } from './home/contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './home/summary/summary.component';
import { TaskComponent } from './home/task/task.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'home', component: SummaryComponent },
  { path: 'home/board', component: BoardComponent },
  { path: 'home/task', component: TaskComponent },
  { path: 'home/contacts', component: ContactsComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
