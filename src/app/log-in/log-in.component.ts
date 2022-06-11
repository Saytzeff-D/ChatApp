import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTrayService } from '../services/user-tray.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public router: Router, public userTray: UserTrayService) { }

  public username;
  public pword;
  public reply;
  ngOnInit(): void {
   
  }
  signIn(){
   for (let i = 0; i < this.userTray.getUser().length; i++) {
      if (this.username == this.userTray.getUser()[i].username ||this.username == this.userTray.getUser()[i].email && this.pword == this.userTray.getUser()[i].pword) {
        this.router.navigate([`/chatHistory/${i}`])
        sessionStorage.setItem('logIn', 'true')      
      }   
      else{
        this.reply = 'Ooops! User not found'
      }   
    }
  }
  signUp(){
    this.router.navigate(['/signup'])
  }

}
