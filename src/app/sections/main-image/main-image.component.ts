import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-image',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-image.component.html',
  styleUrl: './main-image.component.scss'
})
export class MainImageComponent {
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
