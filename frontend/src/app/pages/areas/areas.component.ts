import { Component } from '@angular/core';
import { AreaLinksComponent } from '../../shared/area-links/area-links.component';
import { CtaSectionComponent } from '../../shared/cta-section/cta-section.component';
import { areas } from '../../site-data';

@Component({
  selector: 'nh-areas',
  standalone: true,
  imports: [AreaLinksComponent, CtaSectionComponent],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">Einsatzgebiete</p>
        <h1>Haushaltsauflösungen und Entrümpelungen im Kreis Kleve</h1>
        <p>Wir arbeiten regional, termintreu und mit kurzen Wegen in Geldern, Kevelaer, Straelen und Umgebung.</p>
      </div>
    </section>

    <section class="section">
      <div class="container area-grid">
        @for (area of areas; track area) {
          <article>
            <h2>{{ area }}</h2>
            <p>Besichtigung, Festpreisangebot und fachgerechte Räumung für {{ area }} und die nähere Umgebung.</p>
          </article>
        }
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <nh-area-links />
      </div>
    </section>

    <nh-cta-section />
  `
})
export class AreasComponent {
  readonly areas = areas;
}
