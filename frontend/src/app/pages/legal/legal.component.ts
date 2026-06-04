import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { contact } from '../../site-data';

@Component({
  selector: 'nh-legal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">Rechtliches</p>
        <h1>{{ isPrivacy ? 'Datenschutz' : 'Impressum' }}</h1>
      </div>
    </section>

    <section class="section">
      <div class="container narrow legal-copy">
        @if (!isPrivacy) {
          <h2>Angaben gemäß § 5 TMG</h2>
          <p><strong>Niederrhein Haushaltsauflösungen</strong><br>Adresse wird ergänzt<br>Deutschland</p>
          <p><strong>Kontakt</strong><br>Telefon: {{ contact.phone }}<br>E-Mail: {{ contact.email }}</p>
          <p><strong>Verantwortlich für den Inhalt</strong><br>Name und Anschrift werden ergänzt.</p>
          <p class="placeholder">Hinweis: Dieses Impressum enthält Platzhalter und muss vor Veröffentlichung rechtlich geprüft und vervollständigt werden.</p>
        } @else {
          <h2>Datenschutzhinweise</h2>
          <p>Diese Website ist in Version 1 als statische Website ohne Datenbank und ohne Backend geplant. Beim Aufruf werden technisch notwendige Daten durch den Hosting-Anbieter verarbeitet.</p>
          <h2>Kontaktaufnahme</h2>
          <p>Das Kontaktformular nutzt aktuell einen Mailto-Fallback. Dabei werden die eingegebenen Daten an Ihr lokal eingerichtetes E-Mail-Programm übergeben und nicht über ein Backend gespeichert.</p>
          <h2>Cookies und Tracking</h2>
          <p>Es sind keine Tracking-Cookies vorgesehen. Falls später Analyse- oder API-Dienste ergänzt werden, muss diese Datenschutzerklärung aktualisiert werden.</p>
          <p class="placeholder">Hinweis: Diese Datenschutzhinweise enthalten Platzhalter und müssen vor Veröffentlichung rechtlich geprüft werden.</p>
        }
        <p><a routerLink="/kontakt">Kontakt aufnehmen</a></p>
      </div>
    </section>
  `
})
export class LegalComponent {
  private readonly route = inject(ActivatedRoute);
  readonly contact = contact;
  readonly isPrivacy = this.route.snapshot.data['page'] === 'datenschutz';
}
