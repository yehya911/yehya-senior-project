import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Senior_project';
  loggedIn: boolean = false;
  isAdmin: any;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin() {
    if (this.dataService.isLoggedIn()) {
      this.loggedIn = true;
    }
    if (this.dataService.isAdmin()) {
      this.isAdmin = true;
    }
  }
}
