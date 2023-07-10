import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userInfo: any;
  userId: any = this.dataService.getUserId();
  name: any;
  password: any;
  phonenumber: any;
  address: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUserInfo(this.userId).subscribe(
      (result: any) => {
        this.userInfo = result.output;
      }
    )
  }

  submitForm() {
    const name = document.getElementById("name") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    this.name = name.value;
    this.password = password.value;
    this.phonenumber = phonenumber.value;
    this.address = address.value;

    const formData = new FormData();
    formData.append('id', this.userId + "");
    formData.append('name', this.name);
    formData.append('phonenumber', this.phonenumber);
    formData.append('password', this.password);
    formData.append('address', this.address);

    this.dataService.editUser(formData).subscribe(
      (result: any) => {
        alert(result);
      }, error => {
        alert(error);
      });
  }

}
