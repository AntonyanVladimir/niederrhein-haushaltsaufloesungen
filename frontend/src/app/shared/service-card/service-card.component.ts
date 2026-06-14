import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nh-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="service-card">
      <img [src]="image()" [alt]="imageAlt()" loading="lazy" width="640" height="360">
      <div class="service-card-body">
        <h3>{{ title() }}</h3>
        <p>{{ text() }}</p>
        <a [routerLink]="link()">Mehr erfahren</a>
      </div>
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
      overflow: hidden;
    }
    img {
      aspect-ratio: 16 / 9;
      height: auto;
      object-fit: cover;
      width: 100%;
    }
    .service-card-body {
      display: flex;
      flex: 1;
      flex-direction: column;
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
  readonly image = input.required<string>();
  readonly imageAlt = input.required<string>();
}
