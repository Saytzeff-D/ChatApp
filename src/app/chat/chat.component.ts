import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgTrayService } from '../services/msg-tray.service';
import { UserTrayService } from '../services/user-tray.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public userTray: UserTrayService, public actRoute: ActivatedRoute, public msgTray: MsgTrayService) { }

  public contact;
  public logInUser;
  public filterChat;
  public userName;
  public phoneNum;
  public msgReceiver;
  public receiverIndex;
  public msgText;
  public msgArr = [];
  public indexToChild;
  public senderInd = this.actRoute.snapshot.params.id;
  public allMessages;
  public date = new Date();
  public eachMsg = [];
  public logInId;
  public userImage = ''
  ngOnInit(): void {
    this.contact = this.userTray.getUser();
    let userIndex = this.actRoute.snapshot.params.id
    this.userName = this.contact[userIndex].fullname
    this.phoneNum = this.contact[userIndex].phone
    this.contact.splice(userIndex, 1)
    this.userTray.getUser().map(all=>{
      let currentUserMsg = this.msgTray.myMessage().filter(eachMsg => eachMsg.senderId == this.userTray.getUser()[userIndex].id || eachMsg.receiverId == this.userTray.getUser()[userIndex].id);
      let lastMsg = currentUserMsg.filter(msg=> msg.receiverId == all.id || msg.senderId == all.id);
      let recentMsg = lastMsg[lastMsg.length -1];
      console.log(recentMsg)
      if (recentMsg) {
        all.message = recentMsg.message
      }
      else{
        all.message = 'No recent message'
      }
    })
  }

  general(){
    this.msgReceiver = 'General Group Chat'
    this.userImage = 'assets/grpLogo.png'
    this.allMessages =  this.msgTray.myMessage()
    this.allMessages = this.allMessages.filter(grpMsg=> grpMsg.type == 'Group Chat')

  }
  receiver(i){
    this.userImage = `assets/${this.contact[i].picture}`
    let logInIndex = this.actRoute.snapshot.params.id;
    this.msgReceiver =  this.contact[i].fullname
    for (let j = 0; j < this.userTray.getUser().length; j++) {
      if (this.msgReceiver == this.userTray.getUser()[j].fullname) {
        this.receiverIndex = j;
        
      }
      
    }
    this.allMessages = this.msgTray.myMessage()
    let currentUser = this.userTray.getUser()[logInIndex].id;
    let onlineUser = JSON.parse(localStorage.getItem('allUsers'))[this.receiverIndex].id
    this.allMessages = this.allMessages.filter(each=> (each.senderId == currentUser  && each.receiverId == onlineUser || each.senderId == onlineUser && each.receiverId == currentUser)

    )

    }
  sendMsg(){
    let logInIndex = this.actRoute.snapshot.params.id;
    let userArrIndex = this.actRoute.snapshot.params.id
    if (typeof(localStorage.getItem('arrayOfMessage'))== 'string') {
      this.msgArr = JSON.parse(localStorage.getItem('arrayOfMessage'))
    }
    else{
      this.msgArr = []
    }
    if (this.msgReceiver == 'General Group Chat') {
      let grpMsgContent = {senderId: this.userTray.getUser()[userArrIndex].id, senderName: this.userTray.getUser()[userArrIndex].fullname, type: 'Group Chat', message: this.msgText, sender:true, time: this.date.toLocaleTimeString()}
      let {msgArr} = this
      this.msgArr = [...msgArr, grpMsgContent]
      localStorage.arrayOfMessage = JSON.stringify(this.msgArr)
      this.allMessages =  this.msgTray.myMessage()
    this.allMessages = this.allMessages.filter(grpMsg=> grpMsg.type == 'Group Chat')
    }
    else{
      let msgContent = {senderId: this.userTray.getUser()[userArrIndex].id, receiverId: JSON.parse(localStorage.getItem('allUsers'))[this.receiverIndex].id, message: this.msgText, time: this.date.toLocaleTimeString(), sender: true}
      let {msgArr} = this
      this.msgArr = [...msgArr, msgContent]
      localStorage.setItem('arrayOfMessage', JSON.stringify(this.msgArr))
      this.allMessages = this.msgTray.myMessage()
      let currentUser = this.userTray.getUser()[logInIndex].id;
      let onlineUser = JSON.parse(localStorage.getItem('allUsers'))[this.receiverIndex].id 
      this.allMessages= this.allMessages.filter(
        each=> (each.senderId == currentUser  && each.receiverId == onlineUser || each.senderId == onlineUser && each.receiverId == currentUser)
        
            )
          }
          this.msgText = '';
  }
}
