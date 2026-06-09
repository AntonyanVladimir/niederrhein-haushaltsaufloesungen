import { Component, signal } from '@angular/core';
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
        <div class="nav-top">
          <a class="brand" routerLink="/" aria-label="Niederrhein Haushaltsauflösungen Startseite" (click)="closeMenu()">
            <img src="/logo.png" alt="" width="44" height="44">
            <span>Niederrhein<br>Haushaltsauflösungen</span>
          </a>
          <button
            class="menu-toggle"
            type="button"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="site-menu"
            aria-label="Menü öffnen oder schließen"
            (click)="toggleMenu()"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div id="site-menu" class="nav-menu" [class.open]="menuOpen()">
          <div class="nav-links">
            <a routerLink="/haushaltsaufloesungen" routerLinkActive="active" (click)="closeMenu()">Haushaltsauflösungen</a>
            <a routerLink="/entruempelungen" routerLinkActive="active" (click)="closeMenu()">Entrümpelungen</a>
            <a routerLink="/wohnungsaufloesungen" routerLinkActive="active" (click)="closeMenu()">Wohnungsauflösungen</a>
            <a routerLink="/einsatzgebiete" routerLinkActive="active" (click)="closeMenu()">Einsatzgebiete</a>
            <a routerLink="/kontakt" routerLinkActive="active" (click)="closeMenu()">Kontakt</a>
          </div>
          <a class="phone-link" [href]="'tel:' + phoneHref" (click)="closeMenu()">Jetzt anrufen</a>
        </div>
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
    .nav-top {
      display: contents;
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
    .nav-menu {
      align-items: center;
      display: flex;
      flex: 1 1 auto;
      gap: 1.5rem;
      justify-content: space-between;
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
    .menu-toggle {
      align-items: center;
      background: var(--navy);
      border: 0;
      border-radius: 6px;
      cursor: pointer;
      display: none;
      flex-direction: column;
      gap: 5px;
      height: 42px;
      justify-content: center;
      padding: 0;
      width: 42px;
    }
    .menu-toggle span {
      background: var(--white);
      border-radius: 999px;
      display: block;
      height: 2px;
      width: 20px;
    }
    .menu-toggle:focus-visible {
      outline: 3px solid rgba(168, 139, 99, .45);
      outline-offset: 2px;
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
      .nav-menu {
        align-items: flex-start;
        flex-direction: column;
        gap: .75rem;
      }
    }
    @media (max-width: 640px) {
      .site-header {
        position: static;
      }
      .nav {
        gap: .85rem;
        min-height: 0;
      }
      .nav-top {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .brand {
        font-size: .95rem;
      }
      .brand img {
        height: 38px;
        width: 38px;
      }
      .menu-toggle {
        display: inline-flex;
        flex: 0 0 auto;
      }
      .nav-menu {
        display: none;
        width: 100%;
      }
      .nav-menu.open {
        display: flex;
      }
      .nav-links {
        display: grid;
        gap: .5rem;
        grid-template-columns: 1fr;
        padding-top: .25rem;
        width: 100%;
      }
      .nav-links a {
        background: var(--light);
        border: 1px solid var(--border);
        border-radius: 6px;
        flex: 0 0 auto;
        font-size: .9rem;
        padding: .55rem .7rem;
        width: 100%;
      }
      .phone-link {
        text-align: center;
        width: 100%;
      }
    }
    @media (max-width: 380px) {
      .brand {
        font-size: .86rem;
      }
      .brand img {
        height: 34px;
        width: 34px;
      }
    }
  `]
})
export class HeaderComponent {
  readonly phone = contact.phone;
  readonly phoneHref = contact.phoneHref;
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
