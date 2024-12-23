import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  orderId: any;
  orderDetails: any;
  foodItem: any;
  userId: any;

  constructor(private dataService: DataService, private param: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.param.snapshot.paramMap.get('id');
    this.dataService.getOrderDetails(this.orderId).subscribe(
      (result: any) => {
        this.orderDetails = result.output;
      }
    )
    this.dataService.getOrderUserId(this.orderId).subscribe(
      (result: any) => {
        this.userId = result.output[0].user_id
      }
    )
  }

  getFoodItem(id: any) {
    this.dataService.getSingleFood(id).subscribe(
      (result: any) => {
        this.foodItem = result.output;
      }
    )
  }

  deleteItem() {
    const formData = new FormData();
    formData.append('id', this.orderDetails[0].id);
    formData.append('userId', this.userId);
    formData.append('paid', this.orderDetails[0].paid);

    this.dataService.deleteOrderDetails(formData).subscribe(
      (result: any) => {
        alert(result.message);
        location.reload();
      }, error => {
        alert(error);
      });
  }

}
