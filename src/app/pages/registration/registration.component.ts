import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  regForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([this.createPhoneControl()], this.validatePhones),
      // phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      // phone2: ['', [Validators.pattern(/^(010|011|012|015)\d{8}$/)]], // optional second phone
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  createPhoneControl() {
    return this.fb.control('', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]);
  }

  get phones(): FormArray {
    return this.regForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.createPhoneControl());
  }

  removePhone(index: number) {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  validatePhones(array: AbstractControl) {
    const formArray = array as FormArray;
    if (formArray.length < 1) return { minOnePhone: true };

    for (let ctrl of formArray.controls) {
      if (ctrl.invalid) return { invalidPhone: true };
    }
    return null;
  }

  passwordMatch(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    const { name, email, phones, password } = this.regForm.value;

    const success = this.auth.register({ name, email, phones, password });
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Registration failed. Email may already exist.';
    }
  }

}
