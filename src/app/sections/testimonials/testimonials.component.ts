import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials = [
    {
      text: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: '/assets/img/main-image.png',
    },
    {
      text: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: '/assets/img/main-image.png',
    },
    {
      text: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      image: '/assets/img/main-image.png',
    },
  ];

  currentTestimonialIndex = 0;

  nextTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
  }

  get currentTestimonial() {
    return this.testimonials[this.currentTestimonialIndex];
  }
}
