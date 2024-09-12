import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

interface Testimonial {
  key: string;
  image: string;
  text?: string;
  author?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})

export class TestimonialsComponent implements OnInit, OnDestroy {

  testimonials: Testimonial[] = [
    {
      key: 'testimonial1',
      image: '/assets/img/testimonial-image-01.png',
    },
    {
      key: 'testimonial2',
      image: '/assets/img/testimonial-image-02.png',
    },
    {
      key: 'testimonial3',
      image: '/assets/img/testimonial-image-03.png',
    },
  ];

  currentTestimonialIndex = 0;
  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.loadTranslations();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.testimonials.forEach(testimonial => {
      this.translateService.get(`testimonialsContainer.${testimonial.key}.text`).subscribe({
        next: translatedText => {
          testimonial.text = translatedText;
        },
        error: err => {
          console.error(`Error loading translation for ${testimonial.key}.text`, err);
          testimonial.text = `Error loading text for ${testimonial.key}`;
        }
      });

      this.translateService.get(`testimonialsContainer.${testimonial.key}.author`).subscribe({
        next: translatedAuthor => {
          testimonial.author = translatedAuthor;
        },
        error: err => {
          console.error(`Error loading translation for ${testimonial.key}.author`, err);
          testimonial.author = `Error loading author for ${testimonial.key}`;
        }
      });
    });
  }

  nextTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number) {
    this.currentTestimonialIndex = index;
  }

  get currentTestimonial() {
    return this.testimonials[this.currentTestimonialIndex];
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}