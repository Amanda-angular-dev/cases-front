import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth';
import { AlertifyMessagesService } from '../services/alertify-messages.service';
import { LoginAdminsService } from '../services/login-admins.service';
import { RememberUserAndPassService } from '../services/remember-user-and-pass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  procesandoImg=false
  form = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });
  constructor(private loginAdminService:LoginAdminsService,
              private router: Router,
              private rememberUserAndPassService:RememberUserAndPassService,
              private alertyMessagesService:AlertifyMessagesService) {
               
               }
  ngOnInit(): void {
      if( localStorage.getItem('remember')){
           this.form.setValue({
                user:localStorage.getItem('email') ,
                password:localStorage.getItem('password') ,
                remember: true
           });
      }
  } 
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
            
            
 
            
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  access(): void {
    this.procesandoImg = true
    const remember = this.form.get('remember')?.value 
    const email = this.form.get('email')?.value
    const password = this.form.get('password')?.value
    
   this.rememberUserAndPassService.rememberUserAndPassword(remember,email,password)
   this.loginAdminService.loginUser(this.form.value)
           .subscribe(
              
            (response: AuthResponse)=> {
              this.procesandoImg = false
               console.log(response)
               // Guardar token
               localStorage.setItem('token', response.data.token);
               localStorage.setItem('username', response.data.user.name);
               this.rememberUserAndPassService.saveUserAndPassword(email,password)
               
               this.router.navigate(['/admin/access-done']); 
            
               },
               error => {
                this.procesandoImg = false
                this.alertyMessagesService.invalidUser()
                this.rememberUserAndPassService.cleanLocalstorage()
                
               }) 
  }           
     

}
