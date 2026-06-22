import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { business, contact } from '../../site-data';

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
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            <strong>{{ business.name }}</strong><br>
            {{ business.legalForm }}<br>
            Inhaber: {{ business.owner }}<br>
            {{ business.streetAddress }}<br>
            {{ business.postalCode }} {{ business.city }}<br>
            {{ business.country }}
          </p>
          <p>
            <strong>Kontakt</strong><br>
            Telefon: <a [href]="'tel:' + contact.phoneHref">{{ contact.phone }}</a><br>
            E-Mail: <a [href]="'mailto:' + contact.emailHref">{{ contact.email }}</a><br>
            Website: <a [href]="contact.websiteHref">{{ contact.website }}</a>
          </p>
          <p><strong>Verantwortlich für den Inhalt</strong><br>{{ business.owner }}, Anschrift wie oben.</p>
          <h2>Haftung für Inhalte</h2>
          <p>Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.</p>
          <h2>Haftung für Links</h2>
          <p>Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.</p>
        } @else {
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br>
            {{ business.name }}<br>
            Inhaber: {{ business.owner }}<br>
            {{ business.streetAddress }}, {{ business.postalCode }} {{ business.city }}<br>
            E-Mail: <a [href]="'mailto:' + contact.emailHref">{{ contact.email }}</a>
          </p>
          <h2>2. Hosting und technische Bereitstellung</h2>
          <p>Diese Website wird über Cloudflare Pages bereitgestellt. Beim Aufruf der Website werden technisch notwendige Zugriffsdaten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browser- und Geräteinformationen. Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
          <h2>Kontaktaufnahme</h2>
          <p>Wenn Sie das Kontaktformular nutzen oder uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten, insbesondere Name, Telefonnummer, E-Mail-Adresse, Ort, Anfrageart und Nachricht. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur vorvertraglichen Kommunikation auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO sowie, soweit erforderlich, Art. 6 Abs. 1 lit. f DSGVO.</p>
          <h2>4. E-Mail-Versand über Resend</h2>
          <p>Für den Versand von Kontakt- und Bestätigungsmails nutzen wir den Dienst Resend. Dabei werden die für den E-Mail-Versand erforderlichen Daten verarbeitet, insbesondere Empfängeradresse, Absenderadresse, Betreff und Nachrichteninhalt.</p>
          <h2>5. Speicherdauer</h2>
          <p>Kontaktanfragen speichern wir nur so lange, wie dies zur Bearbeitung der Anfrage und zur Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist. Nicht mehr benötigte Daten werden gelöscht.</p>
          <h2>6. Cookies und Tracking</h2>
          <p>Diese Website verwendet keine Analyse- oder Marketing-Cookies und kein Tracking. Wenn Sie den Cookie-Hinweis bestätigen, wird diese Entscheidung lokal in Ihrem Browser gespeichert, damit der Hinweis nicht erneut angezeigt wird.</p>
          <h2>7. Ihre Rechte</h2>
          <p>Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
          <h2>8. Pflicht zur Bereitstellung von Daten</h2>
          <p>Die Bereitstellung Ihrer Daten im Kontaktformular ist freiwillig. Ohne die erforderlichen Angaben können wir Ihre Anfrage jedoch nicht bearbeiten.</p>
        }
        <p><a routerLink="/kontakt">Kontakt aufnehmen</a></p>
      </div>
    </section>
  `
})
export class LegalComponent {
  private readonly route = inject(ActivatedRoute);
  readonly contact = contact;
  readonly business = business;
  readonly isPrivacy = this.route.snapshot.data['page'] === 'datenschutz';
}
