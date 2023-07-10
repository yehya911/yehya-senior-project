import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name: any;
  email: any;
  password: any;
  myForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.myForm.get('name')?.invalid) {
      alert("Please enter your name");
    }
    else if (this.myForm.get('email')?.invalid) {
      alert("Please enter a valid email");
    }
    else if (this.myForm.get('password')?.invalid) {
      alert("Please enter a valid password");
    }
    else {
      const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
      const address = document.getElementById("address") as HTMLTextAreaElement;
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('phonenumber', phonenumber.value);
      formData.append('address', address.value);

      this.dataService.signUp(formData).subscribe(
        (result: any) => {
          alert(result.message);
          localStorage.setItem('userId', result.output[0].id);
          setTimeout(() => {
            window.location.reload();
          }, 50);
          this.router.navigate(['home']);
        }, error => {
          alert(error);
        });
    }
  }

}
