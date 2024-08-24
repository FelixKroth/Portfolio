import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainContentComponent } from "./main-content/main-content.component";
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './shared/components/impressum/impressum.component';
import { PolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PolicyComponent, ImpressumComponent, HeaderComponent, FooterComponent, MainContentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('scrollTop', { static: false }) scrollTopButton!: ElementRef;
  @ViewChild(FooterComponent, { read: ElementRef }) footer!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.adjustScrollButtonPosition();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition > 150) {
      this.scrollTopButton.nativeElement.style.display = 'block';
    } else {
      this.scrollTopButton.nativeElement.style.display = 'none';
    }

    this.adjustScrollButtonPosition();
  }

  adjustScrollButtonPosition() {
    if (this.scrollTopButton && this.footer) {
      const scrollTop = this.scrollTopButton.nativeElement;
      const footerRect = this.footer.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const footerTopPosition = footerRect.top + scrollPosition;
  
      const marginBottom = 16;
      const buttonDistanceFromFooter = footerTopPosition - (scrollPosition + windowHeight + marginBottom);
  
      const contentMaxWidth = 1920;
      const buttonMarginRight = 24;
      const viewportWidth = window.innerWidth;
  
      let rightValue = buttonMarginRight;
  
      if (viewportWidth > contentMaxWidth) {
        const excessWidth = (viewportWidth - contentMaxWidth) / 2;
        rightValue = excessWidth + buttonMarginRight;
      }

      scrollTop.style.right = `${rightValue}px`;

      if (buttonDistanceFromFooter <= 0) {
        const overlap = Math.abs(buttonDistanceFromFooter) + marginBottom;
        scrollTop.style.position = 'fixed';
        scrollTop.style.bottom = `${overlap}px`;
      } else {
        scrollTop.style.position = 'fixed';
        scrollTop.style.bottom = `${marginBottom}px`;
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}