import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieNoticeComponent } from './shared/cookie-notice/cookie-notice.component';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'nh-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieNoticeComponent],
  template: `
    <nh-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <nh-footer />
    <nh-cookie-notice />
  `
})
export class AppComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.bindRouteMeta();
  }
}
