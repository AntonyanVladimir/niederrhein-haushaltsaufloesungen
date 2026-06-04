import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { CtaSectionComponent } from '../../shared/cta-section/cta-section.component';
import { AreaLinksComponent } from '../../shared/area-links/area-links.component';
import { serviceCards, trustItems } from '../../site-data';

@Component({
  selector: 'nh-home',
  standalone: true,
  imports: [HeroComponent, ServiceCardComponent, CtaSectionComponent, AreaLinksComponent],
  template: `
    <nh-hero />

    <section class="section">
      <div class="container section-heading">
        <p class="eyebrow">Leistungen</p>
        <h2>Räumungen mit klarer Planung und sauberem Abschluss</h2>
        <p>Von der ersten Besichtigung bis zur besenreinen Übergabe arbeiten wir zuverlässig, diskret und regional am Niederrhein.</p>
      </div>
      <div class="container card-grid">
        @for (service of services; track service.link) {
          <nh-service-card [title]="service.title" [text]="service.text" [link]="service.link" />
        }
      </div>
    </section>

    <section class="section section-muted">
      <div class="container process-grid">
        <div>
          <p class="eyebrow">Ablauf</p>
          <h2>So läuft eine Anfrage ab</h2>
          <p>Ein kurzer, nachvollziehbarer Prozess sorgt dafür, dass Termine, Kosten und Übergabezustand vorab geklärt sind.</p>
        </div>
        <ol class="steps">
          <li><strong>Kontakt aufnehmen</strong><span>Sie schildern kurz Objekt, Ort und gewünschte Leistung.</span></li>
          <li><strong>Besichtigung vor Ort</strong><span>Wir prüfen Umfang und klären Besonderheiten diskret.</span></li>
          <li><strong>Festpreis und Termin</strong><span>Sie erhalten ein transparentes Angebot mit klarem Leistungsumfang.</span></li>
          <li><strong>Räumung und Übergabe</strong><span>Wir räumen fachgerecht und übergeben nach Absprache besenrein.</span></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container trust-list">
        @for (item of trustItems; track item) {
          <div><span aria-hidden="true">✓</span>{{ item }}</div>
        }
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <nh-area-links />
      </div>
    </section>

    <nh-cta-section />
  `
})
export class HomeComponent {
  readonly services = serviceCards;
  readonly trustItems = trustItems;
}
