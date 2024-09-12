import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../../app/translation.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  pokedexSubtitle: SafeHtml = '';
  joinSubtitle: SafeHtml = '';
  elPolloLocoSubtitle: SafeHtml = '';
  portfolioSubtitle: SafeHtml = '';

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.translateSubtitles();


    this.translate.onLangChange.subscribe(() => {
      this.translateSubtitles();
    });
  }

  private translateSubtitles() {
    this.translate.get('portfolioContent.pokedex.subtitle').subscribe((res: string) => {
      this.pokedexSubtitle = this.sanitizeHtml(res);
    });
    this.translate.get('portfolioContent.join.subtitle').subscribe((res: string) => {
      this.joinSubtitle = this.sanitizeHtml(res);
    });
    this.translate.get('portfolioContent.el_pollo_loco.subtitle').subscribe((res: string) => {
      this.elPolloLocoSubtitle = this.sanitizeHtml(res);
    });
    this.translate.get('portfolioContent.portfolio.subtitle').subscribe((res: string) => {
      this.portfolioSubtitle = this.sanitizeHtml(res);
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}