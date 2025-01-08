import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicationHttpService } from '../comunication-http.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent  {

  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private comunicationHttpService:ComunicationHttpService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.comunicationHttpService.register(this.registerForm.value)
      .subscribe( data => {
         alert('regist do')
      
         },
         error => {
          alert('wrong')
        
         })
      console.log('Register Data:', this.registerForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}
