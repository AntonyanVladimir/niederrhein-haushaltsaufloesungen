import { Component } from '@angular/core';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { contact } from '../../site-data';

@Component({
  selector: 'nh-contact',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <section class="sub-hero">
      <div class="container narrow">
        <p class="eyebrow">Kontakt</p>
        <h1>Kostenlose Besichtigung anfragen</h1>
        <p>Beschreiben Sie kurz Ihr Anliegen. Wir melden uns zur Abstimmung von Umfang, Termin und nächstem Schritt.</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <div class="contact-box">
          <h2>Direktkontakt</h2>
          <div class="contact-methods" aria-label="Direkte Kontaktmöglichkeiten">
            <a class="contact-method" [href]="'tel:' + contact.phoneHref" aria-label="Jetzt telefonisch Kontakt aufnehmen">
              <span class="method-label">Telefon</span>
              <strong>{{ contact.phone }}</strong>
            </a>
            <a class="contact-method" [href]="'mailto:' + contact.emailHref" aria-label="E-Mail schreiben">
              <span class="method-label">E-Mail</span>
              <strong>{{ contact.email }}</strong>
            </a>
            <a class="contact-method" [href]="contact.websiteHref" aria-label="Website öffnen">
              <span class="method-label">Website</span>
              <strong>{{ contact.website }}</strong>
            </a>
          </div>
        </div>
        <nh-contact-form />
      </div>
    </section>
  `,
  styles: [`
    .contact-methods {
      display: grid;
      gap: .8rem;
    }
    .contact-method {
      background: var(--light);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--navy);
      display: grid;
      gap: .15rem;
      padding: .9rem 1rem;
      text-decoration: none;
    }
    .contact-method:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .contact-method:focus-visible {
      outline: 3px solid rgba(168, 139, 99, .28);
      outline-offset: 2px;
    }
    .method-label {
      color: var(--muted);
      font-size: .82rem;
      font-weight: 800;
      text-transform: uppercase;
    }
    strong {
      overflow-wrap: anywhere;
    }
  `]
})
export class ContactComponent {
  readonly contact = contact;
}
