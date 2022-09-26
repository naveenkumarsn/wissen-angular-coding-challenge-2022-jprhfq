/**
 * Modify this file to fetch and display the login details
 */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user; // type this variable using user.type.ts file
  constructor(private authenticationService: AuthenticationService) {}

  async ngOnInit() {
    let det = await this.authenticationService.user();
    //let userDet = JSON.stringify(det);
    let users = localStorage.getItem('final');
    console.log('display', users);
    this.user = users;
  }

  ngOnDestroy() {}
}
