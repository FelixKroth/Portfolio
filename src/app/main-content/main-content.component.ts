import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainImageComponent } from '../sections/main-image/main-image.component';
import { AboutComponent } from '../sections/about/about.component';
import { SkillsComponent } from '../sections/skills/skills.component';
import { PortfolioComponent } from '../sections/portfolio/portfolio.component';
import { ContactComponent } from '../sections/contact/contact.component';
import { TestimonialsComponent } from '../sections/testimonials/testimonials.component';
import AOS from 'aos';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MainImageComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})

export class MainContentComponent {
  ngOnInit() {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      disable: false,
      once: true,
    });
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
