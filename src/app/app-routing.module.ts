import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatPageGuard } from './guards/chat-page.guard';
import { LogInComponent } from './log-in/log-in.component';
import { SignInInputComponent } from './sign-in-input/sign-in-input.component';
import { SignInMessageComponent } from './sign-in-message/sign-in-message.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: '', redirectTo: '/signup', pathMatch: 'full'},
  {path: 'signup', component: SignInComponent, children:[
    {path: '', component: SignInInputComponent},
    {path: 'message', component: SignInMessageComponent},
    {path: 'login', component: LogInComponent}
  ]},
  {path: 'chatHistory/:id', component: ChatComponent, canActivate: [ChatPageGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
