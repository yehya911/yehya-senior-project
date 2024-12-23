import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  foodID: any;
  foodData: any;
  categories: any;
  selectedCategory: any;
  selectedCatId: any;
  selectedOptionValue: any;
  name: any;
  price: any;
  point_price: any;
  description: any;
  image: any;

  constructor(private dataService: DataService, private param: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.foodID = this.param.snapshot.paramMap.get('id');
    this.dataService.getSingleFood(this.foodID).subscribe(
      (result: any) => {
        this.foodData = result.output;
        this.dataService.getSelectedCategory(result.output[0].c_id).subscribe(
          (result: any) => {
            this.selectedCategory = result.output;
            this.selectedCatId = result.output[0].id;
            this.getSelectedOptionValue();
          }
        )
      }
    )
    this.dataService.getCategories().subscribe(
      (result: any) => {
        this.categories = result.output;
      }
    )
  }

  submitForm() {
    const selectElement = document.getElementById("cat") as HTMLSelectElement;
    this.selectedOptionValue = selectElement.value;
    if (this.selectedOptionValue == 0) {
      alert("Select a valid category.")
    }
    else {
      const name = document.getElementById("name") as HTMLInputElement;
      const price = document.getElementById("price") as HTMLInputElement;
      const pointPrice = document.getElementById("pointPrice") as HTMLInputElement;
      const description = document.getElementById("description") as HTMLTextAreaElement;
      const imageFile = document.getElementById("image") as HTMLInputElement;
      const fullPath: string = imageFile.value;
      const image: string = fullPath.split("\\").pop() || fullPath.split("/").pop() || "";
      this.name = name.value;
      this.price = price.value;
      this.point_price = pointPrice.value;
      this.description = description.value;
      this.image = image;

      const formData = new FormData();
      formData.append('foodId', this.foodID);
      formData.append('c_id', this.selectedOptionValue);
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('pointPrice', this.point_price);
      formData.append('description', this.description);
      formData.append('image', this.image);

      this.dataService.editItem(formData).subscribe(
        (result: any) => {
          alert(result);
          this.dataService.getSingleFood(this.foodID).subscribe(
            (result: any) => {
              this.foodData = result.output;
              this.dataService.getSelectedCategory(result.output[0].c_id).subscribe(
                (result: any) => {
                  this.selectedCategory = result.output;
                  this.selectedCatId = result.output[0].id;
                  this.getSelectedOptionValue();
                }
              )
            }
          )
        }, error => {
          alert(error);
        });
    }
  }
  getSelectedOptionValue(): void {
    const selectElement = document.getElementById("cat") as HTMLSelectElement;
    selectElement.selectedIndex = parseInt(this.selectedCatId, 10);
  }
}
