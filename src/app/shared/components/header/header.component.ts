import { Component, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../../translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isDropdownOpen = false;
  private globalClickListener: () => void;

  constructor(
    private translateService: TranslationService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.handleOutsideClick(event);
    });
  }

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  scrollToSection(section: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    this.isDropdownOpen = false;
  }

  handleOutsideClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  switchLanguage(language: string) {
    this.translateService.switchLanguage(language);
  }

  ngOnDestroy() {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }
}