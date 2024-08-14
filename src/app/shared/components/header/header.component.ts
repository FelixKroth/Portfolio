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

  constructor(
    private translateService: TranslationService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {
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
        }
      });
  }

  private sectionToScroll: string | null = null;

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  scrollToSection(section: string, event?: Event) {
    if (event) {
      event.preventDefault(); // Prevent the default anchor behavior
    }

    if (this.router.url !== '/') {
      // Store the section to scroll to after navigation
      this.sectionToScroll = section;
      this.router.navigate(['/']);
    } else {
      // Scroll directly if already on the home route
      this.scrollToSectionOnPage(section);
    }

    if (this.mobiledropdown) {
      this.mobiledropdown.nativeElement.style.display = 'none';
    }
    
    this.isDropdownOpen = false;
  }

  private scrollToSectionOnPage(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.sectionToScroll = null; // Reset after scrolling
    }
  }

  mobiledropdownmenu(event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent the click from bubbling up and triggering the document listener
    }

    const dropdown = this.mobiledropdown.nativeElement;
    const isDropdownVisible = dropdown.style.display === 'block';

    // Toggle the dropdown menu visibility
    dropdown.style.display = isDropdownVisible ? 'none' : 'block';
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
