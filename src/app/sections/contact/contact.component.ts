import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  messageSent = false; 
  submissionError = false; 

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  
  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      
      console.log('Sending email with the following data:', formData);
      this.messageSent = true; 
      setTimeout(() => {
        this.messageSent = false;
      }, 3500);
      this.submissionError = false; 
      this.contactForm.reset();
    } else {
      this.messageSent = false; 
      this.submissionError = true; 
      setTimeout(() => {
        this.submissionError = false;
      }, 3500);
    }
  }

  get isFormInvalid() {
    return this.contactForm.invalid;
  }
}
