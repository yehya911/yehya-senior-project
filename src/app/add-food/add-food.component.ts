import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  categories: any;
  name: any;
  price: any;
  description: any;
  image: any;
  selectedOptionValue: any;
  myForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required]
  });

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
      alert("Select a valid category")
    }
    else {
      if (this.myForm.get('name')?.invalid) {
        alert("Please enter a valid name");
      }
      else if (this.myForm.get('price')?.invalid) {
        alert("Please enter a valid price");
      }
      else {
        const name = document.getElementById("name") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const description = document.getElementById("description") as HTMLTextAreaElement;
        const imageFile = document.getElementById("image") as HTMLInputElement;
        const fullPath: string = imageFile.value;
        const image: string = fullPath.split("\\").pop() || fullPath.split("/").pop() || "";

        this.name = name.value;
        this.price = price.value;
        this.description = description.value;
        this.image = image;

        const formData = new FormData();
        formData.append('c_id', this.selectedOptionValue);
        formData.append('name', this.name);
        formData.append('price', this.price);
        formData.append('description', this.description);
        formData.append('image', this.image);

        this.dataService.addItem(formData).subscribe(
          (result: any) => {
            if (result.success == 2) {
              alert(result.message);
            } else {
              this.reset();
              alert(result.message);
            }
          }, error => {
            alert(error);
          });
      }
    }
  }

  reset() {
    const selectElement = document.getElementById("cat") as HTMLSelectElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLTextAreaElement;
    const image = document.getElementById("image") as HTMLInputElement;
    name.value = "";
    price.value = "";
    description.value = "";
    image.value = "";
    selectElement.selectedIndex = 0;
  }

}
