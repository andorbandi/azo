import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  authApi = inject(AuthService);
  
  loginForm = this.builder.group({
    name: ['mari'],
    password: ['titok']
  });

  login() {
    console.log('betöltés...')
    console.log(this.loginForm.value);
  
    this.authApi.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data.accessToken);
        localStorage.setItem("token", data.accessToken);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }


}
