import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EstimateWidgetComponent } from '../../shared/estimate-widget/estimate-widget.component';
import { features } from '../../site-data';

@Component({
  selector: 'nh-estimate-page',
  standalone: true,
  imports: [EstimateWidgetComponent, RouterLink],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">Preisschätzung</p>
        <h1>Entrümpelung grob einschätzen</h1>
        <p>Erhalten Sie mit wenigen Angaben eine unverbindliche Preisorientierung. Für ein verbindliches Angebot prüfen wir den Umfang persönlich.</p>
      </div>
    </section>

    <section class="section">
      <div class="container estimate-layout">
        <div class="estimate-main">
          @if (features.aiEstimatePreview) {
            <p class="preview-note">Preview: Diese Funktion wird noch getestet. Die Berechnung ist unverbindlich und kann sich noch ändern.</p>
          }
          <nh-estimate-widget />
        </div>
        <aside class="estimate-note">
          <h2>Wichtig zu wissen</h2>
          <p>Die Schätzung dient nur zur ersten Orientierung. Etage, Zugang, Parkweg, Füllgrad und besondere Gegenstände können den finalen Aufwand verändern.</p>
          <a class="btn btn-secondary" routerLink="/kontakt">Unverbindliche Anfrage stellen</a>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .estimate-layout {
      align-items: start;
      display: grid;
      gap: 1.5rem;
      grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr);
    }
    .estimate-main {
      display: grid;
      gap: 1rem;
    }
    .preview-note {
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      color: #9a3412;
      font-weight: 750;
      margin: 0;
      padding: .85rem 1rem;
    }
    .estimate-note {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 1.25rem;
    }
    .estimate-note h2 {
      font-size: 1.35rem;
      margin-top: 0;
    }
    .estimate-note .btn {
      margin-top: .5rem;
    }
    @media (max-width: 900px) {
      .estimate-layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EstimateComponent {
  readonly features = features;
}
