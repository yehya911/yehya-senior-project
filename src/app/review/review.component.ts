import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  userId: any = this.dataService.getUserId();
  foodID: any;
  rating: any;
  comment: any;
  foodData: any;
  loggedIn: boolean = this.dataService.isLoggedIn();
  userReview: any;

  constructor(private dataService: DataService, private param: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.foodID = this.param.snapshot.paramMap.get('id');
    this.dataService.getSingleFood(this.foodID).subscribe(
      (result: any) => {
        this.foodData = result.output;
      }
    )
    this.getReview()
  }

  getReview() {
    const formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('foodId', this.foodID);
    this.dataService.getUserReview(formData).subscribe(
      (result: any) => {
        if (result.output) {
          this.userReview = result.output;
        }
      }
    )
  }

  public submit() {
    if (this.dataService.isLoggedIn()) {
      const radioInput = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
      const textarea = document.getElementById("myTextarea") as HTMLTextAreaElement;
      this.rating = radioInput?.value ?? "0";
      this.comment = textarea.value;
      const formData = new FormData();
      formData.append('userId', this.userId + "");
      formData.append('foodId', this.foodID);
      formData.append('rating', this.rating);
      formData.append('comment', this.comment);

      this.dataService.submitReview(formData).subscribe(
        (result: any) => {
          alert(result);
          location.reload();
        }, error => {
          alert(error);
        });
    } else {
      alert("You need to log in before adding a review.")
    }
  }

  editReview() {
    const radioInput = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
    const textarea = document.getElementById("edit") as HTMLTextAreaElement;
    this.rating = radioInput?.value ?? "0";
    this.comment = textarea.value;
    const formData = new FormData();
    formData.append('userId', this.userId + "");
    formData.append('foodId', this.foodID);
    formData.append('rating', this.rating);
    formData.append('comment', this.comment);

    this.dataService.editReview(formData).subscribe(
      (result: any) => {
        alert(result)
      }, error => {
        alert(error);
      });
  }

}
