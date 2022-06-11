import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTrayService {
  length: number;

  constructor() { }
  getUser(){
    return JSON.parse(localStorage.getItem('allUsers'))
  }
}
