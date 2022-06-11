import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-message',
  templateUrl: './sign-in-message.component.html',
  styleUrls: ['./sign-in-message.component.css']
})
export class SignInMessageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  logIn(){
    this.router.navigate(['signup/login'])
  }

}
