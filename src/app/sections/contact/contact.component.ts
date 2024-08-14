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
  messageSent = false; // Initialize messageSent
  submissionError = false; // Initialize submissionError

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // Getter for easy access to form controls in the template
  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      // Replace the URL with your backend API endpoint to handle the email sending
      console.log('Sending email with the following data:', formData);
      this.messageSent = true; // Show success message
      setTimeout(() => {
        this.messageSent = false;
      }, 2500);
      this.submissionError = false; // Hide error message if previously shown
      this.contactForm.reset();
    } else {
      this.messageSent = false; // Hide success message if previously shown
      this.submissionError = true; // Show error message
      setTimeout(() => {
        this.submissionError = false;
      }, 2500);
    }
  }

  get isFormInvalid() {
    return this.contactForm.invalid;
  }
}
