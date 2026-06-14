import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'nh-cookie-notice-accepted';

@Component({
  selector: 'nh-cookie-notice',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (isVisible()) {
      <section class="cookie-notice" aria-label="Hinweis zur Datennutzung">
        <div>
          <h2>Hinweis zur Datennutzung</h2>
          <p>Diese Website verwendet keine Tracking- oder Marketing-Cookies. Für den Betrieb werden nur technisch notwendige Funktionen genutzt.</p>
        </div>
        <div class="cookie-actions">
          <a routerLink="/datenschutz">Datenschutz</a>
          <button type="button" (click)="accept()">Verstanden</button>
        </div>
      </section>
    }
  `,
  styles: [`
    .cookie-notice {
      align-items: center;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      bottom: 1rem;
      box-shadow: 0 18px 50px rgba(6, 31, 58, .18);
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      left: 50%;
      max-width: 860px;
      padding: 1rem;
      position: fixed;
      transform: translateX(-50%);
      width: calc(100% - 2rem);
      z-index: 20;
    }
    h2 {
      color: var(--navy);
      font-size: 1rem;
      margin: 0 0 .25rem;
    }
    p {
      color: var(--muted);
      margin: 0;
    }
    .cookie-actions {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: .75rem;
    }
    a {
      color: var(--accent);
      font-weight: 800;
      text-decoration: none;
    }
    button {
      background: var(--navy);
      border: 0;
      border-radius: 6px;
      color: var(--white);
      cursor: pointer;
      font: inherit;
      font-weight: 800;
      min-height: 42px;
      padding: .65rem .9rem;
    }
    a:focus-visible,
    button:focus-visible {
      outline: 3px solid rgba(168, 139, 99, .35);
      outline-offset: 2px;
    }
    @media (max-width: 640px) {
      .cookie-notice {
        align-items: stretch;
        flex-direction: column;
      }
      .cookie-actions {
        justify-content: space-between;
      }
      button {
        min-width: 150px;
      }
    }
  `]
})
export class CookieNoticeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly isVisible = signal(this.shouldShow());

  accept(): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    this.isVisible.set(false);
  }

  private shouldShow(): boolean {
    return this.isBrowser && localStorage.getItem(STORAGE_KEY) !== 'true';
  }
}
