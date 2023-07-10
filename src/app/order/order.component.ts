import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  foodID: any;
  foodData: any;
  loggedIn: any = this.dataService.isLoggedIn();
  userId: any = this.dataService.getUserId();
  userInfo: any;
  name: any;
  phonenumber: any;
  address: any;

  constructor(private dataService: DataService, private param: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.foodID = this.param.snapshot.paramMap.get('id');
    this.dataService.getSingleFood(this.foodID).subscribe(
      (result: any) => {
        this.foodData = result.output;
      }
    )
    this.dataService.getUserInfo(this.userId).subscribe(
      (result: any) => {
        this.userInfo = result.output;
      }
    )
  }

  order() {
    const name = document.getElementById("name") as HTMLInputElement;
    const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    this.name = name.value;
    this.phonenumber = phonenumber.value;
    this.address = address.value;

    const formData = new FormData();
    formData.append('userId', this.userInfo[0].id);
    formData.append('foodId', this.foodID);
    formData.append('name', this.name);
    formData.append('phonenumber', this.phonenumber);
    formData.append('address', this.address);
    formData.append('paid', this.foodData[0].price);

    this.dataService.addOrder(formData).subscribe(
      (result: any) => {
        alert(result);
        setTimeout(() => {
          window.location.reload();
        }, 50);
        this.router.navigate(['menu']);
      }, error => {
        alert(error);
      });
  }

  orderPoints() {
    if (parseInt(this.userInfo[0].point, 10) < parseInt(this.foodData[0].point_price, 10)) {
      alert("You don't have enough points!");
    }
    else {
      const name = document.getElementById("name") as HTMLInputElement;
      const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
      const address = document.getElementById("address") as HTMLTextAreaElement;
      this.name = name.value;
      this.phonenumber = phonenumber.value;
      this.address = address.value;

      const formData = new FormData();
      formData.append('userId', this.userInfo[0].id);
      formData.append('foodId', this.foodID);
      formData.append('name', this.name);
      formData.append('phonenumber', this.phonenumber);
      formData.append('address', this.address);
      formData.append('paid', this.foodData[0].point_price);

      this.dataService.addOrderPoints(formData).subscribe(
        (result: any) => {
          alert(result[0]);
          setTimeout(() => {
            window.location.reload();
          }, 50);
          this.router.navigate(['menu']);
        }, error => {
          alert(error);
        });
    }
  }

}
