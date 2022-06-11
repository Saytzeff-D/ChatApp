import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgTrayService {

  constructor() { }
  myMessage(){
    return JSON.parse(localStorage.getItem('arrayOfMessage'))
  }
}
