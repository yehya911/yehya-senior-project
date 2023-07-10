import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  bestSeller: any;
  orders: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBestSeller().subscribe(
      (result: any) => {
        this.dataService.getSingleFood(result.output[0].food_id).subscribe(
          (result: any) => {
            this.bestSeller = result.output;
          }
        );
      }
    )
    this.dataService.getOrders().subscribe(
      (result: any) => {
        this.orders = result.output;
      }
    )
  }

  deleteOrder(index: any) {
    const formData = new FormData();
    formData.append('orderId', this.orders[index].orderId);
    formData.append('userId', this.orders[index].userId);
    formData.append('paid', this.orders[index].totalPaid);

    this.dataService.deleteOrder(formData).subscribe(
      (result: any) => {
        alert(result.message);
      }, error => {
        alert(error);
      });
    location.reload();
  }

  updateOrders(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    const formData = new FormData();
    formData.append('date', selectedDate);
    this.dataService.getOrdersByDate(formData).subscribe(
      (result: any) => {
        this.orders = result.output;
      });
  }
}
