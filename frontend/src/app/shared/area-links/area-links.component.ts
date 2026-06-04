import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { areas, landingPages } from '../../site-data';

@Component({
  selector: 'nh-area-links',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="area-block">
      <h2>Regional im Einsatz</h2>
      <p>{{ areaText }}</p>
      <div class="landing-links" aria-label="Regionale Leistungsseiten">
        @for (page of landingPages; track page.link) {
          <a [routerLink]="page.link">{{ page.label }}</a>
        }
      </div>
    </div>
  `,
  styles: [`
    .area-block {
      background: var(--light);
      border-radius: 8px;
      padding: clamp(1.5rem, 4vw, 2.25rem);
    }
    h2 {
      margin-top: 0;
    }
    p {
      color: var(--muted);
      margin-bottom: 1.25rem;
    }
    .landing-links {
      display: flex;
      flex-wrap: wrap;
      gap: .65rem;
    }
    a {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 6px;
      color: var(--navy);
      font-weight: 700;
      padding: .65rem .85rem;
      text-decoration: none;
    }
    a:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  `]
})
export class AreaLinksComponent {
  readonly areaText = areas.join(', ');
  readonly landingPages = landingPages;
}
