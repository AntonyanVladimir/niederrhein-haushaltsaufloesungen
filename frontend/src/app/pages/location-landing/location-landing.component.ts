import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CtaSectionComponent } from '../../shared/cta-section/cta-section.component';
import { AreaLinksComponent } from '../../shared/area-links/area-links.component';

type LandingKey =
  | 'haushaltsaufloesung-geldern'
  | 'entruempelung-geldern'
  | 'haushaltsaufloesung-kevelaer'
  | 'entruempelung-kevelaer'
  | 'haushaltsaufloesung-straelen'
  | 'entruempelung-straelen';

const landingContent: Record<LandingKey, { service: string; city: string; noun: string }> = {
  'haushaltsaufloesung-geldern': { service: 'Haushaltsauflösung', city: 'Geldern', noun: 'Haushaltsauflösung' },
  'entruempelung-geldern': { service: 'Entrümpelung', city: 'Geldern', noun: 'Entrümpelung' },
  'haushaltsaufloesung-kevelaer': { service: 'Haushaltsauflösung', city: 'Kevelaer', noun: 'Haushaltsauflösung' },
  'entruempelung-kevelaer': { service: 'Entrümpelung', city: 'Kevelaer', noun: 'Entrümpelung' },
  'haushaltsaufloesung-straelen': { service: 'Haushaltsauflösung', city: 'Straelen', noun: 'Haushaltsauflösung' },
  'entruempelung-straelen': { service: 'Entrümpelung', city: 'Straelen', noun: 'Entrümpelung' }
};

@Component({
  selector: 'nh-location-landing',
  standalone: true,
  imports: [RouterLink, CtaSectionComponent, AreaLinksComponent],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">Regionaler Service</p>
        <h1>{{ content.service }} in {{ content.city }}</h1>
        <p>Zuverlässige {{ content.noun }} in {{ content.city }} mit kostenloser Besichtigung, transparenter Abstimmung und besenreiner Übergabe.</p>
        <a class="btn btn-primary" routerLink="/kontakt">Kostenlose Besichtigung anfragen</a>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div>
          <h2>{{ content.service }} {{ content.city }}: klarer Ablauf, saubere Übergabe</h2>
          <p>Wir unterstützen Privatkunden, Angehörige, Vermieter und Hausverwaltungen bei Räumungen in {{ content.city }} und der Umgebung. Vor Beginn klären wir Umfang, Termin, Entsorgung und gewünschte Übergabe.</p>
        </div>
        <ul class="check-list">
          <li>Kostenlose Besichtigung in {{ content.city }}</li>
          <li>Transparenter Festpreis nach Objektumfang</li>
          <li>Diskrete und fachgerechte Abwicklung</li>
          <li>Besenreine Übergabe nach Absprache</li>
        </ul>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <nh-area-links />
      </div>
    </section>

    <nh-cta-section [headline]="content.service + ' in ' + content.city + ' anfragen'" />
  `
})
export class LocationLandingComponent {
  private readonly router = inject(Router);
  readonly slug = this.router.url.replace('/', '') as LandingKey;
  readonly content = landingContent[this.slug] ?? landingContent['haushaltsaufloesung-geldern'];
}
