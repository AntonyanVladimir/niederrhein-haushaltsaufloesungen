import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrustBadgeComponent } from '../trust-badge/trust-badge.component';
import { trustItems } from '../../site-data';

@Component({
  selector: 'nh-hero',
  standalone: true,
  imports: [RouterLink, TrustBadgeComponent],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ eyebrow() }}</p>
          <h1>{{ headline() }}</h1>
          <p class="lead">{{ subheadline() }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" routerLink="/kontakt">Kostenlose Besichtigung anfragen</a>
            <a class="btn btn-secondary" href="tel:+49XXXXXXXX">Jetzt anrufen</a>
          </div>
        </div>
        <div class="hero-panel" aria-label="Vorteile">
          <p class="panel-label">Ihre Vorteile</p>
          @for (item of trustItems; track item) {
            <nh-trust-badge [label]="item" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background:
        linear-gradient(135deg, rgba(6,31,58,.94), rgba(11,47,85,.88)),
        url('/logo.png') right 8% center / 280px no-repeat;
      color: var(--white);
      padding: clamp(3.5rem, 7vw, 6.25rem) 0;
    }
    .hero-grid {
      align-items: center;
      display: grid;
      gap: clamp(2rem, 5vw, 4.5rem);
      grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
    }
    .eyebrow {
      color: var(--accent-light);
      font-weight: 750;
      letter-spacing: 0;
      margin: 0 0 1rem;
      text-transform: uppercase;
    }
    h1 {
      color: var(--white);
      font-size: clamp(1.95rem, 3.45vw, 3.35rem);
      line-height: 1.08;
      margin: 0;
      max-width: 660px;
    }
    .lead {
      color: rgba(255, 255, 255, .88);
      font-size: clamp(1.2rem, 2.4vw, 1.55rem);
      margin: 1.2rem 0 0;
      max-width: 680px;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .8rem;
      margin-top: 2rem;
    }
    .hero-panel {
      background: rgba(255, 255, 255, .09);
      border: 1px solid rgba(255, 255, 255, .22);
      border-radius: 8px;
      display: grid;
      gap: .15rem 1rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 1.4rem;
    }
    .panel-label {
      color: var(--accent-light);
      font-size: .84rem;
      font-weight: 850;
      grid-column: 1 / -1;
      margin: 0 0 .55rem;
      text-transform: uppercase;
    }
    @media (max-width: 1050px) {
      .hero-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      h1 {
        max-width: 720px;
      }
    }
    @media (max-width: 850px) {
      .hero-grid { grid-template-columns: 1fr; }
      .hero { background: linear-gradient(135deg, var(--navy), var(--blue)); }
    }
    @media (max-width: 620px) {
      .hero-panel {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HeroComponent {
  readonly eyebrow = input('Regional im Kreis Kleve');
  readonly headline = input('Haushaltsauflösungen & Entrümpelungen am Niederrhein');
  readonly subheadline = input('Zuverlässig räumen. Sauber übergeben.');
  readonly trustItems = trustItems;
}
