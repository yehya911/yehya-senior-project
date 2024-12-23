import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: any;
  userId: any = this.dataService.getUserId();
  userInfo: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUserInfo(this.userId).subscribe(
      (result: any) => {
        this.userInfo = result.output;
      }
    )
    this.checkLogin();
  }

  checkLogin() {
    this.loggedIn = this.dataService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('userId');
    this.checkLogin();
    setTimeout(() => {
      window.location.reload();
    }, 50);
    this.router.navigate(['home']);
    alert("logout successfull");
  }

}
