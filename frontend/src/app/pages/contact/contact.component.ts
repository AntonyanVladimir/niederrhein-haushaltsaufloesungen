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
          <p><strong>Telefon</strong><br><a [href]="'tel:' + contact.phone">{{ contact.phone }}</a></p>
          <p><strong>E-Mail</strong><br><a [href]="'mailto:' + contact.email">{{ contact.email }}</a></p>
          <p><strong>Website</strong><br>{{ contact.website }}</p>
        </div>
        <nh-contact-form />
      </div>
    </section>
  `
})
export class ContactComponent {
  readonly contact = contact;
}
