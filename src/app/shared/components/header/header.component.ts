import {
  Component,
  ElementRef,
  Renderer2,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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
    public translateService: TranslationService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      this.translateService.switchLanguage(savedLang);
    } else {
      this.translateService.switchLanguage('en');
    }

    this.globalClickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        this.handleOutsideClick(event);
      }
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sectionToScroll) {
          this.scrollToSectionOnPage(this.sectionToScroll);
          console.log(this.sectionToScroll, 'scroll to section works');
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
      event.preventDefault();
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

  public scrollToSectionOnPage(section: string) {
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.sectionToScroll = null;
      }

      if (this.router.url !== '/') {
        this.sectionToScroll = section;
        this.router.navigate(['/']);
      }
    }, 0);
  }

  handleOutsideClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  switchLanguage(language: string) {
    this.translateService.switchLanguage(language);
    localStorage.setItem('selectedLang', language);
  }

  ngOnDestroy() {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }
}
