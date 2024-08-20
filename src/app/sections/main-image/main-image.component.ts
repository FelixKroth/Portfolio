import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../../app/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-image',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.scss'],
})

export class MainImageComponent {
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
