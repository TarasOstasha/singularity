import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import appState  from '../../app-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  appState: any;

  username: any;
  email: any;
  password: any;

  

  constructor(
    private api: ApiService,
    private router: Router,
  ) { 
    this.appState = appState;
  }

  ngOnInit() {
  }

  async signUp() {
    try {
      // create via data binding NgModel - another vay -> event.target.name.value
      const userData = {
        name: this.username,
        email: this.email,
        password: this.password
      }
      //console.log(userData, 'user data')

      const fromServer: any = await this.api.register(userData);
      if( fromServer.ok ) this.router.navigateByUrl('/redirector');

    } catch (error) {
      console.log(error)
    }
  }

  async singIn() {
    try {
      const userData = {
        email: this.email,
        password: this.password
      }
      const fromServer: any = await this.api.login(userData);
      if( fromServer.ok ) this.router.navigateByUrl('/redirector');
      this.appState.header.user = fromServer.user;
      
    } catch (error) {
      console.log(error)
    }
  }

}
