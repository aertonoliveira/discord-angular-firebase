import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register(){
    this.authService.signup(this.registerForm.value.email,this.registerForm.value.password)
    .then((data: any )=>{
      const user = {
        displayName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        uid: data.user.uid,
      }
      this.authService.setUserData(user)
      })
      .catch((error: any)=>{
        console.log(error)
        this.error = error
      });
  }

}
