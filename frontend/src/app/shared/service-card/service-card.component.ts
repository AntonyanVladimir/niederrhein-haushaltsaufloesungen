import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nh-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="service-card">
      <h3>{{ title() }}</h3>
      <p>{{ text() }}</p>
      <a [routerLink]="link()">Mehr erfahren</a>
    </article>
  `,
  styles: [`
    .service-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      min-height: 245px;
      padding: 1.5rem;
    }
    h3 {
      font-size: 1.35rem;
      margin: 0 0 .75rem;
    }
    p {
      color: var(--muted);
      margin: 0;
    }
    a {
      color: var(--accent);
      font-weight: 800;
      margin-top: auto;
      padding-top: 1.25rem;
      text-decoration: none;
    }
  `]
})
export class ServiceCardComponent {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly link = input.required<string>();
}
