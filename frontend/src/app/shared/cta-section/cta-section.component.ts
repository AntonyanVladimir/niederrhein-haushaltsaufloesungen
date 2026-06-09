import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { contact } from '../../site-data';

@Component({
  selector: 'nh-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta">
      <div class="container cta-inner">
        <div>
          <h2>{{ headline() }}</h2>
          <p>{{ text() }}</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" routerLink="/kontakt">Kostenlose Besichtigung anfragen</a>
          <a class="btn btn-secondary" [href]="'tel:' + phoneHref">Jetzt anrufen</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta {
      background: var(--blue);
      color: var(--white);
      padding: 3rem 0;
    }
    .cta-inner {
      align-items: center;
      display: flex;
      gap: 2rem;
      justify-content: space-between;
    }
    h2 {
      color: var(--white);
      margin: 0 0 .5rem;
    }
    p {
      color: rgba(255, 255, 255, .82);
      margin: 0;
      max-width: 680px;
    }
    .cta-actions {
      display: flex;
      flex: 0 0 auto;
      flex-wrap: wrap;
      gap: .75rem;
    }
    @media (max-width: 820px) {
      .cta-inner { align-items: flex-start; flex-direction: column; }
    }
  `]
})
export class CtaSectionComponent {
  readonly headline = input('Kostenlose Besichtigung vor Ort anfragen');
  readonly text = input('Wir klären Umfang, Termin und Festpreis transparent vorab.');
  readonly phoneHref = contact.phoneHref;
}
