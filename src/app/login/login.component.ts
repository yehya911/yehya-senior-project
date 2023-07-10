import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.myForm.get('email')?.invalid) {
      alert("Please enter a valid email");
    }
    else if (this.myForm.get('password')?.invalid) {
      alert("Please enter a valid password");
    }
    else {
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      this.dataService.login(formData).subscribe(
        (result: any) => {
          if (result.success == 0) {
            alert(result.output);
          }
          else {
            if (result.output[0].is_admin != "0") {
              localStorage.setItem('isAdmin', result.output[0].is_admin);
              setTimeout(() => {
                window.location.reload();
              }, 50);
              this.router.navigate(['admindashboard']);
            }
            else {
              localStorage.setItem('userId', result.output[0].id);
              setTimeout(() => {
                window.location.reload();
              }, 50);
              this.router.navigate(['home']);
            }
          }
        }, error => {
          error(error);
        });
    }
  }

}
