import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  error: AuthResponse = {isSuccess: true, message: ''}
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  signin(){
    this.authService.signup(this.registerForm.value.email,this.registerForm.value.password)
    .then((data: any )=>{
      console.log(data)
      })
      .catch((error: any)=>{
        console.log(error)
        this.error = error
      });
  }
}
