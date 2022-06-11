import { Component, Input, OnInit } from '@angular/core';
import { MsgTrayService } from '../services/msg-tray.service';
import { UserTrayService } from '../services/user-tray.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {

  constructor(public msgTray: MsgTrayService, public userTray: UserTrayService) { }

  @Input() msgSenderIndex;
  @Input() logInIndex;
  @Input() onlineIndex;
  @Input() myMessage;
  public senderOfMessage;
  public index;
  @Input() eachUserMsg;
  ngOnInit(): void {
    
  }
  ngOnChanges(){
    let msg = JSON.parse(localStorage.getItem('arrayOfMessage'))
    for (let b = 0; b < msg.length; b++) {
      if (this.userTray.getUser()[this.logInIndex].id == msg[b].senderId) {
        msg[b].sender = true;
        localStorage.arrayOfMessage = JSON.stringify(msg)
      }
      else if(this.userTray.getUser()[this.logInIndex].id !== msg[b].senderId){
        msg[b].sender = false;
        localStorage.arrayOfMessage = JSON.stringify(msg)
      }
      
    }

  }

}
