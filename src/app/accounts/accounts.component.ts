import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  users: any;
  index: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTopUsers().subscribe(
      (result: any) => {
        this.users = result.output;
      }
    )
  }

  reward() {
    const points = document.getElementById('pointAdd') as HTMLInputElement;
    if (!points.value) {
      alert("Enter a point value to add")
    }
    else {
      const formData = new FormData();
      formData.append('userId', this.users[this.index].userId);
      formData.append('points', points.value);

      this.dataService.rewardPoints(formData).subscribe(
        (result: any) => {
          alert(result);
          location.reload();
        }, error => {
          alert(error);
        });
    }
  }

  deduct() {
    const points = document.getElementById('pointDeduct') as HTMLInputElement;
    if (!points.value) {
      alert("Enter a point value to add")
    }
    else {
      const formData = new FormData();
      formData.append('userId', this.users[this.index].userId);
      formData.append('points', points.value);

      this.dataService.deductPoints(formData).subscribe(
        (result: any) => {
          alert(result);
          location.reload();
        }, error => {
          alert(error);
        });
    }
  }

  openModal(index: number) {
    this.index = index;
  }

  resetOrders() {
    this.dataService.resetOrders().subscribe(
      (result: any) => {
        this.users = result.message;
      }
    )
  }

}
