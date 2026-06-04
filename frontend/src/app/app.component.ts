import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'nh-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <nh-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <nh-footer />
  `
})
export class AppComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.bindRouteMeta();
  }
}
