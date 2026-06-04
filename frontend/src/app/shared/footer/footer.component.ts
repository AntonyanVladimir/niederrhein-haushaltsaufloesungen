import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { areas, contact } from '../../site-data';

@Component({
  selector: 'nh-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <section>
          <h2>Niederrhein Haushaltsauflösungen</h2>
          <p>Zuverlässig räumen. Sauber übergeben.</p>
          <p>{{ contact.phone }}<br>{{ contact.email }}<br>{{ contact.website }}</p>
        </section>
        <section>
          <h2>Leistungen</h2>
          <a routerLink="/haushaltsaufloesungen">Haushaltsauflösungen</a>
          <a routerLink="/entruempelungen">Entrümpelungen</a>
          <a routerLink="/wohnungsaufloesungen">Wohnungsauflösungen</a>
          <a routerLink="/kontakt">Kostenlose Besichtigung</a>
        </section>
        <section>
          <h2>Einsatzgebiete</h2>
          <p>{{ areaText }}</p>
        </section>
        <section>
          <h2>Rechtliches</h2>
          <a routerLink="/impressum">Impressum</a>
          <a routerLink="/datenschutz">Datenschutz</a>
        </section>
      </div>
      <div class="container footer-bottom">
        <span>© Niederrhein Haushaltsauflösungen</span>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: var(--navy);
      color: rgba(255, 255, 255, .86);
      padding: 3rem 0 1.5rem;
    }
    .footer-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: 1.4fr 1fr 1fr 1fr;
    }
    h2 {
      color: var(--white);
      font-size: 1rem;
      margin: 0 0 .85rem;
    }
    p {
      margin: 0 0 1rem;
    }
    a {
      color: rgba(255, 255, 255, .86);
      display: block;
      margin: .35rem 0;
      text-decoration: none;
    }
    a:hover { color: var(--accent); }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,.18);
      margin-top: 2rem;
      padding-top: 1rem;
      font-size: .9rem;
    }
    @media (max-width: 800px) {
      .footer-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {
  readonly contact = contact;
  readonly areaText = areas.join(', ');
}
