import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignInMessageComponent } from './sign-in-message/sign-in-message.component';
import { SignInInputComponent } from './sign-in-input/sign-in-input.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserformValidatorDirective } from './directives/userform-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { PhoneNumValidatorDirective } from './directives/phone-num-validator.directive';
import { ChatFilterPipe } from './pipes/chat-filter.pipe';
import { MessagePageComponent } from './message-page/message-page.component';
import { ChatComponent } from './chat/chat.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SignInComponent,
    SignInMessageComponent,
    SignInInputComponent,
    LogInComponent,
    UserformValidatorDirective,
    EmailValidatorDirective,
    PhoneNumValidatorDirective,
    ChatFilterPipe,
    MessagePageComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
