import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-admin',
  templateUrl: './agregar-admin.component.html',
  styleUrls: ['./agregar-admin.component.css']
})
export class AgregarAdminComponent  {

  adminForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.adminService.registerAdmin(this.adminForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Admin registered successfully!';
          this.errorMessage = '';
          this.adminForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to register admin. Please try again.';
          this.successMessage = '';
          console.error(error);
        }
      });
    }
  }

}
