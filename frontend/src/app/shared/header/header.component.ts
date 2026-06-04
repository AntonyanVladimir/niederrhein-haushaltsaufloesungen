import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { contact } from '../../site-data';

@Component({
  selector: 'nh-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#main-content">Zum Inhalt springen</a>
    <header class="site-header">
      <nav class="container nav" aria-label="Hauptnavigation">
        <a class="brand" routerLink="/" aria-label="Niederrhein Haushaltsauflösungen Startseite">
          <img src="/logo.png" alt="" width="44" height="44">
          <span>Niederrhein<br>Haushaltsauflösungen</span>
        </a>
        <div class="nav-links">
          <a routerLink="/haushaltsaufloesungen" routerLinkActive="active">Haushaltsauflösungen</a>
          <a routerLink="/entruempelungen" routerLinkActive="active">Entrümpelungen</a>
          <a routerLink="/wohnungsaufloesungen" routerLinkActive="active">Wohnungsauflösungen</a>
          <a routerLink="/einsatzgebiete" routerLinkActive="active">Einsatzgebiete</a>
          <a routerLink="/kontakt" routerLinkActive="active">Kontakt</a>
        </div>
        <a class="phone-link" [href]="'tel:' + phone">Jetzt anrufen</a>
      </nav>
    </header>
  `,
  styles: [`
    .skip-link {
      position: absolute;
      left: -999px;
      top: 0;
      z-index: 10;
      background: var(--navy);
      color: var(--white);
      padding: .75rem 1rem;
    }
    .skip-link:focus { left: 1rem; }
    .site-header {
      background: var(--white);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 5;
    }
    .nav {
      align-items: center;
      display: flex;
      gap: 1.5rem;
      justify-content: space-between;
      min-height: 76px;
    }
    .brand {
      align-items: center;
      color: var(--navy);
      display: inline-flex;
      flex: 0 0 auto;
      font-weight: 800;
      gap: .75rem;
      line-height: 1.05;
      text-decoration: none;
    }
    .brand img {
      border-radius: 8px;
      height: 44px;
      width: 44px;
    }
    .nav-links {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: .25rem .85rem;
      justify-content: center;
    }
    .nav-links a {
      color: var(--text);
      font-size: .94rem;
      font-weight: 650;
      padding: .45rem .15rem;
      text-decoration: none;
    }
    .nav-links a.active,
    .nav-links a:hover {
      color: var(--accent);
    }
    .phone-link {
      background: var(--navy);
      border-radius: 6px;
      color: var(--white);
      flex: 0 0 auto;
      font-weight: 750;
      padding: .75rem 1rem;
      text-decoration: none;
    }
    @media (max-width: 900px) {
      .nav {
        align-items: flex-start;
        flex-direction: column;
        gap: .75rem;
        padding-block: 1rem;
      }
      .nav-links {
        justify-content: flex-start;
      }
    }
  `]
})
export class HeaderComponent {
  readonly phone = contact.phone;
}
