import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-input',
  templateUrl: './sign-in-input.component.html',
  styleUrls: ['./sign-in-input.component.css']
})
export class SignInInputComponent implements OnInit {

  constructor(public router: Router) { }

  public reply;
  public uploadedPics = ''
  public arrayOfUsers = [];
  public file;
  public userForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    pword: new FormControl('', Validators.required),
    confirm_pword: new FormControl('', Validators.required)
 })
  ngOnInit(): void {

  }
  openFile(){
    document.getElementById('userPic').click()
  }
  uploadPic(e){
    let file = e.target.files[0]
    this.file = file.name
    const this_ = this
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(){
      this_.uploadedPics = reader.result as any
    }
  }
  signUp(){
    if (this.userForm.valid && this.userForm.get('pword').value == this.userForm.get('confirm_pword').value) {
      if (typeof(localStorage.getItem('allUsers')) == 'string') {
        this.arrayOfUsers = JSON.parse(localStorage.getItem('allUsers'))
      }
      else{
        this.arrayOfUsers = []
      }
      if(this.uploadedPics == ''){
        this.reply = 'Profile Picture is required'
      }else {
        this.userForm.value.id = this.arrayOfUsers.length + 1
        this.userForm.value.picture = this.uploadedPics
        let { arrayOfUsers } = this
        this.arrayOfUsers = [...arrayOfUsers, this.userForm.value]
        localStorage.setItem('allUsers', JSON.stringify(this.arrayOfUsers))
        this.router.navigate(['/signup/message'])
      }
    }
    else if(this.userForm.invalid){
      this.reply = 'Please fill out all input'
    }
    else{
      this.reply = 'Password not match'
    }
  }
  signIn(){
    this.router.navigate(['signup/login'])
  }

}
