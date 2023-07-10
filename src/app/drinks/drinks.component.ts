import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  foodID: any;
  drinks: any;
  cartItems: any[] = [];
  foodItem: any;

  constructor(private dataService: DataService, private param: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.foodID = this.param.snapshot.paramMap.get('id');
    this.dataService.getFood(this.foodID).subscribe(
      (result: any) => {
        this.drinks = result.output;
      }
    )
  }

  addToCart(id: any) {
    const CartItems = localStorage.getItem('cartItems');
    if (CartItems) {
      this.cartItems = JSON.parse(CartItems);
      this.dataService.getSingleFood(id).subscribe(
        (result: any) => {
          this.foodItem = Object.assign({}, result.output[0], { quantity: 1 }, { points: 0 }, { paid: result.output[0].price });
          this.cartItems.push(this.foodItem);
          localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
      )
      alert("item added to your cart");
    }
    else {
      this.dataService.getSingleFood(id).subscribe(
        (result: any) => {
          this.foodItem = Object.assign({}, result.output[0], { quantity: 1 }, { points: 0 }, { paid: result.output[0].price });
          this.cartItems.push(this.foodItem);
          localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
      )
      alert("item added to your cart");
    }
  }
}
