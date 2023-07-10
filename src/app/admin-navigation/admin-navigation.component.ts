import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {
  isAdmin: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.dataService.isAdmin();
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.isAdmin = this.dataService.isAdmin();
    alert("logout successfull");
    setTimeout(() => {
      window.location.reload();
    }, 50);
    this.router.navigate(['home']);
  }

}
