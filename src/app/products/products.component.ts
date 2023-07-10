import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  appetizers: any;
  entrees: any;
  desserts: any;
  drinks: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFood(1).subscribe(
      (result: any) => {
        this.appetizers = result.output;
      }
    )
    this.dataService.getFood(2).subscribe(
      (result: any) => {
        this.entrees = result.output;
      }
    )
    this.dataService.getFood(3).subscribe(
      (result: any) => {
        this.desserts = result.output;
      }
    )
    this.dataService.getFood(4).subscribe(
      (result: any) => {
        this.drinks = result.output;
      }
    )
  }

  deleteFood(id: any) {
    this.dataService.deleteItem(id).subscribe(
      (result: any) => {
        alert(result.message);
        location.reload();
      }, error => {
        alert(error);
      }
    )
  }
}
