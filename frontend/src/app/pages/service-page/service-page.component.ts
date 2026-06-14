import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AreaLinksComponent } from '../../shared/area-links/area-links.component';
import { CtaSectionComponent } from '../../shared/cta-section/cta-section.component';
import { trustItems } from '../../site-data';

@Component({
  selector: 'nh-service-page',
  standalone: true,
  imports: [RouterLink, AreaLinksComponent, CtaSectionComponent],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">{{ service }}</p>
        <h1>{{ headline }}</h1>
        <p>{{ intro }}</p>
        <a class="btn btn-primary" routerLink="/kontakt">Kostenlose Besichtigung anfragen</a>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div>
          <h2>Leistungsumfang</h2>
          <p>Jede Räumung wird individuell geplant. Entscheidend sind Objektgröße, Zugang, Entsorgungsumfang und gewünschter Übergabezustand.</p>
          <div class="service-media-block">
            <img [src]="image" [alt]="imageAlt" loading="lazy" width="960" height="540">
          </div>
        </div>
        <ul class="check-list">
          @for (point of points; track point) {
            <li>{{ point }}</li>
          }
          @for (item of trustItems; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <nh-area-links />
      </div>
    </section>

    <nh-cta-section [headline]="service + ' unverbindlich anfragen'" />
  `,
  styles: [`
    .service-media-block {
      border-radius: 8px;
      box-shadow: var(--shadow);
      margin-top: 1.25rem;
      overflow: hidden;
    }
    .service-media-block img {
      aspect-ratio: 16 / 9;
      height: auto;
      object-fit: cover;
      width: 100%;
    }
  `]
})
export class ServicePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = this.route.snapshot.data;
  readonly service = this.data['service'] as string;
  readonly headline = this.data['headline'] as string;
  readonly intro = this.data['intro'] as string;
  readonly points = this.data['points'] as string[];
  readonly image = this.data['image'] as string;
  readonly imageAlt = this.data['imageAlt'] as string;
  readonly trustItems = trustItems.slice(0, 3);
}
