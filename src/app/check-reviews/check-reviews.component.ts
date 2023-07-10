import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-reviews',
  templateUrl: './check-reviews.component.html',
  styleUrls: ['./check-reviews.component.css']
})
export class CheckReviewsComponent implements OnInit {
  foodID: any;
  foodData: any;
  rating: any;
  isRated: any;
  comments: any;
  tooltipValue: any;
  isHovering: boolean = false;

  constructor(private dataService: DataService, private param: ActivatedRoute) { }

  ngOnInit(): void {
    this.foodID = this.param.snapshot.paramMap.get('id');
    this.dataService.getFoodRating(this.foodID).subscribe(
      (result: any) => {
        this.foodData = result.output;
        this.rating = result.output;
        if (this.rating[0].rate == null) {
          this.isRated = false;
        }
        else {
          this.isRated = true;
        }
      }
    )
    this.dataService.getReviews(this.foodID).subscribe(
      (result: any) => {
        this.comments = result.output;
      }
    )
  }

  getFormattedDate(dateString: string) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const date = new Date(year, month - 1, day);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedDay = day.toString().padStart(2, '0');

    return monthNames[date.getMonth()] + " " + formattedDay + " " + year;
  }

  showElement() {
    const progress = document.getElementById("prog") as HTMLProgressElement;
    this.tooltipValue = progress.value;
    this.isHovering = true;
  }

  hideElement() {
    this.isHovering = false;
  }
}