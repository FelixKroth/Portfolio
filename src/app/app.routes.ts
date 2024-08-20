import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ImpressumComponent } from './shared/components/impressum/impressum.component';
import { PolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent},
    { path: 'impressum', component: ImpressumComponent},
    { path: 'privacy-policy', component: PolicyComponent}
];