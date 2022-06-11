import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-input',
  templateUrl: './sign-in-input.component.html',
  styleUrls: ['./sign-in-input.component.css']
})
export class SignInInputComponent implements OnInit {

  constructor(public router: Router) { }

  public reply;
  public uploadedPics;
  public arrayOfUsers = [];
  public userForm = new FormGroup({
    fullname: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  address: new FormControl(''),
  username: new FormControl(''),
  pword: new FormControl(''),
  confirm_pword: new FormControl('')
 })
  ngOnInit(): void {
    
  }
  openFile(){
    document.getElementById('userPic').click()
  }
  signUp(){
    if (this.userForm.valid && this.userForm.get('fullname').dirty ==true && this.userForm.get('email').dirty ==true && this.userForm.get('phone').dirty ==true && this.userForm.get('address').dirty ==true && this.userForm.get('username').dirty ==true && this.userForm.get('pword').dirty ==true && this.userForm.get('confirm_pword').dirty == true && this.userForm.get('pword').value == this.userForm.get('confirm_pword').value) {
      if (typeof(localStorage.getItem('allUsers')) == 'string') {
        this.arrayOfUsers = JSON.parse(localStorage.getItem('allUsers'))
      }
      else{
        this.arrayOfUsers = []
      }this.userForm.value.id = this.arrayOfUsers.length + 1
      this.userForm.value.picture = this.uploadedPics
      let {arrayOfUsers} = this
      this.arrayOfUsers =[...arrayOfUsers, this.userForm.value]
      localStorage.setItem('allUsers', JSON.stringify(this.arrayOfUsers))
      this.router.navigate(['/signup/message'])
    }
    else if(this.userForm.get('pword').value !== this.userForm.get('confirm_pword').value){
      this.reply = 'Password not match'
    }
    else{
      this.reply = 'Please fill out all input'
    }
  }
  signIn(){
    this.router.navigate(['signup/login'])
  }

}
