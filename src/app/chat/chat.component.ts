import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MsgTrayService } from '../services/msg-tray.service';
import { UserTrayService } from '../services/user-tray.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public userTray: UserTrayService,
    public actRoute: ActivatedRoute,
    public msgTray: MsgTrayService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  public contact;
  public logInUser;
  public filterChat;
  public authUser;
  public authImage;
  public phoneNum;
  public msgReceiver;
  public receiverIndex;
  public msgText;
  public msgArr = [];
  public indexToChild;
  public senderInd = this.actRoute.snapshot.params.id;
  public allMessages;
  public eachMsg = [];
  public logInId;
  public userImage = ''
  public recentMsg = []
  public recentGrpMsg
  public myMessage = []

  ngOnInit(): void {
    this.recentMsg = []
    this.myMessage = this.msgTray.myMessage()
    this.contact = this.userTray.getUser();
    let userIndex = this.actRoute.snapshot.params.id
    this.authUser = this.contact[userIndex].fullname
    this.phoneNum = this.contact[userIndex].phone
    this.authImage = this.contact[userIndex].picture
    this.contact.splice(userIndex, 1)
    this.recentGrpMsg = this.myMessage.filter(each=> each.type == 'Group Chat')[this.myMessage.filter(each=> each.type == 'Group Chat').length-1].message
    this.userTray.getUser().map(user=> {
      let currentUserMsg = this.myMessage.filter(each => each.senderId == userIndex+1 || each.receiverId == userIndex+1)
      console.log(currentUserMsg)
      let lastMsg = currentUserMsg.filter(msg => msg.senderId == user.id || msg.receiverId == user.id)
      this.recentMsg.push(lastMsg[lastMsg.length -1].message)
    })
    console.log(this.recentMsg)
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  general(){
    this.msgReceiver = 'General Group Chat'
    this.userImage = 'assets/grpLogo.png'
    this.allMessages =  this.msgTray.myMessage()
    this.allMessages = this.allMessages.filter(grpMsg=> grpMsg.type == 'Group Chat')

  }
  receiver(i){
    this.userImage = this.contact[i].picture
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
      let grpMsgContent = {senderId: this.userTray.getUser()[userArrIndex].id, senderName: this.userTray.getUser()[userArrIndex].fullname, type: 'Group Chat', message: this.msgText, sender:true, time: new Date().toLocaleTimeString()}
      let {msgArr} = this
      this.msgArr = [...msgArr, grpMsgContent]
      localStorage.arrayOfMessage = JSON.stringify(this.msgArr)
      this.allMessages =  this.msgTray.myMessage()
    this.allMessages = this.allMessages.filter(grpMsg=> grpMsg.type == 'Group Chat')
    this.ngOnInit()
    }
    else{
      let msgContent = {senderId: this.userTray.getUser()[userArrIndex].id, receiverId: JSON.parse(localStorage.getItem('allUsers'))[this.receiverIndex].id, message: this.msgText, time: new Date().toLocaleTimeString(), sender: true}
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
          this.ngOnInit()
  }
}
