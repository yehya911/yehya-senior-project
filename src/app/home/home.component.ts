import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodData: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFavorites().subscribe(
      (result: any) => {
        for (let i = 0; i < 4; i++) {
          this.foodData[i] = result.output[i];
        }
      }
    )
  }

}
