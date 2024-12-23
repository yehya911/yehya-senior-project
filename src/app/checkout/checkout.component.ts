import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subTotal: number = 0;
  pointTotal: number = 0;
  total: number = 0;
  cartItems: any[] = [];
  foodItems: any[] = [];
  userId: any = this.dataService.getUserId();
  userInfo: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    const CartItems = localStorage.getItem('cartItems');
    if (CartItems) {
      this.cartItems = JSON.parse(CartItems);
      for (let i = 0; i < this.cartItems.length; i++) {
        this.subTotal += parseInt(this.cartItems[i].price, 10) * this.cartItems[i].quantity;
        this.pointTotal += parseInt(this.cartItems[i].points, 10) * this.cartItems[i].quantity;
        this.total += parseInt(this.cartItems[i].paid, 10) * this.cartItems[i].quantity;
      }
    }
    this.dataService.getUserInfo(this.userId).subscribe(
      (result: any) => {
        this.userInfo = result.output;
      }
    )
  }

  add(i: any) {
    this.cartItems[i].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    if (!this.cartItems[i].paid) {
      this.subTotal += parseInt(this.cartItems[i].price, 10);
      this.pointTotal += parseInt(this.cartItems[i].point_price, 10);
    }
    else {
      this.subTotal += parseInt(this.cartItems[i].price, 10);
      this.total += parseInt(this.cartItems[i].price, 10);
    }
  }

  remove(i: any) {
    if (this.cartItems[i].quantity == 1) {
      alert("You can't go lower, you have to remove this item")
    }
    else {
      this.cartItems[i].quantity--;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      if (!this.cartItems[i].paid) {
        this.subTotal -= parseInt(this.cartItems[i].price, 10);
        this.pointTotal -= parseInt(this.cartItems[i].point_price, 10);
      }
      else {
        this.subTotal -= parseInt(this.cartItems[i].price, 10);
        this.total -= parseInt(this.cartItems[i].price, 10);
      }
    }
  }

  deleteItem(i: any) {
    this.subTotal -= parseInt(this.cartItems[i].paid, 10);
    this.total -= parseInt(this.cartItems[i].paid, 10);
    this.cartItems.splice(i, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  usePoints(i: any) {
    this.cartItems[i].points = this.cartItems[i].point_price;
    this.cartItems[i].paid = 0;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.pointTotal += parseInt(this.cartItems[i].points, 10) * this.cartItems[i].quantity;
    this.total -= parseInt(this.cartItems[i].price, 10) * this.cartItems[i].quantity;
  }

  removePoints(i: any) {
    this.pointTotal -= parseInt(this.cartItems[i].points, 10) * this.cartItems[i].quantity;
    this.total += parseInt(this.cartItems[i].price, 10) * this.cartItems[i].quantity;
    this.cartItems[i].points = 0;
    this.cartItems[i].paid = this.cartItems[i].price;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  checkOut() {
    if (this.dataService.isLoggedIn()) {
      if (parseInt(this.userInfo[0].point, 10) < this.pointTotal) {
        alert("You don't have enough points!");
      }
      else {
        for (let i = 0; i < this.cartItems.length; i++) {
          for (let j = 0; j < this.cartItems[i].quantity; j++) {
            const food = Object.assign({ foodId: this.cartItems[i].id }, { paid: this.cartItems[i].paid });
            this.foodItems.push(food);
          }
        }
        const name = document.getElementById("name") as HTMLInputElement;
        const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
        const address = document.getElementById("address") as HTMLTextAreaElement;

        const formData = new FormData();
        formData.append('userId', this.userInfo[0].id);
        formData.append('name', name.value);
        formData.append('phonenumber', phonenumber.value);
        formData.append('address', address.value);
        formData.append('pointsUsed', this.pointTotal + "");
        formData.append('foodItems', JSON.stringify(this.foodItems));

        this.dataService.checkOut(formData).subscribe(
          (result: any) => {
            alert(result);
            setTimeout(() => {
              window.location.reload();
            }, 50);
            this.router.navigate(['menu']);
          }, error => {
            alert(error);
          });
        localStorage.removeItem('cartItems')
      }
    } else {
<<<<<<< HEAD
      alert("You need to log in before adding a review.")
=======
      alert("You need to log in before making your order.")
>>>>>>> 247b6c539a991b05e084e0b931ccff0282dd9c4b
    }
  }

}
