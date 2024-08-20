import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})

export class ContactComponent {
  contactForm: FormGroup;
  messageSent = false;
  submissionError = false;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue] // Checkbox form control with requiredTrue validator
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('subject', this.contactForm.get('name')?.value);
      formData.append('email', this.contactForm.get('email')?.value);
      formData.append('message', this.contactForm.get('message')?.value);

      this.http.post('https://felix-kroth.de/send-email.php', formData, { responseType: 'json' }).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.messageSent = true;
            setTimeout(() => {
              this.messageSent = false;
            }, 3500);
            this.submissionError = false;
            this.contactForm.reset();
          } else {
            this.handleError();
          }
        },
        error: () => this.handleError(),
      });
    } else {
      this.handleError();
    }
  }

  private handleError() {
    this.messageSent = false;
    this.submissionError = true;
    setTimeout(() => {
      this.submissionError = false;
    }, 3500);
  }

  get isFormInvalid() {
    return this.contactForm.invalid;
  }
}