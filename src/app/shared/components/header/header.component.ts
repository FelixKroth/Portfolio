import { Component, ElementRef, Renderer2, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../../translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('mobiledropdown') mobiledropdown!: ElementRef;
  isDropdownOpen = false;
  private globalClickListener: () => void;
  private sectionToScroll: string | null = null;

  constructor(
    private translateService: TranslationService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.handleOutsideClick(event);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sectionToScroll) {
          this.scrollToSectionOnPage(this.sectionToScroll);
        }
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
      event.preventDefault()
    }

    if (this.router.url !== '/') {
      this.sectionToScroll = section;
      this.router.navigate(['/']);
      this.isDropdownOpen = false;
    } else {
      this.scrollToSectionOnPage(section);
    }

    this.isDropdownOpen = false;
  }

  private scrollToSectionOnPage(section: string) {
    const element = document.getElementById(section);
    if (element) {
        const sectionHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;

        if (sectionHeight < viewportHeight) {
            const offsetTop = element.offsetTop - ((viewportHeight - sectionHeight) / 2);
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        } else {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        this.sectionToScroll = null;
    }
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