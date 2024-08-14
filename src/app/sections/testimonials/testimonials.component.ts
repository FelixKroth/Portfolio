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
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, sunt.',
      image: '/assets/img/main-image.png',
    },
    {
      text: 'Repudiandae ducimus id dolores aliquid excepturi iure consequuntur ex ad. Tenetur quo qui consequatur eveniet nam nihil voluptate officia distinctio.',
      image: '/assets/img/main-image.png',
    },
    {
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum eanam iure nisi sint architecto, explicabo ipsa nobis quibusdam delenitifquo dolorem vel ad repellendus quaerat laboriosam porro molliti ablanditiis molestiae saepe esse placeat.',
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
