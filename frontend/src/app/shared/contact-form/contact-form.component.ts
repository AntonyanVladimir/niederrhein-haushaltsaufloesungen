import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { contact } from '../../site-data';

@Component({
  selector: 'nh-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" autocomplete="name">
      </div>
      <div class="field">
        <label for="phone">Telefonnummer</label>
        <input id="phone" type="tel" formControlName="phone" autocomplete="tel">
      </div>
      <div class="field">
        <label for="email">E-Mail</label>
        <input id="email" type="email" formControlName="email" autocomplete="email">
      </div>
      <div class="field">
        <label for="city">Ort</label>
        <input id="city" type="text" formControlName="city" autocomplete="address-level2">
      </div>
      <div class="field span-2">
        <label for="requestType">Art der Anfrage</label>
        <select id="requestType" formControlName="requestType">
          <option value="">Bitte auswählen</option>
          <option>Haushaltsauflösung</option>
          <option>Entrümpelung</option>
          <option>Wohnungsauflösung</option>
          <option>Keller- oder Garagenräumung</option>
          <option>Nachlassauflösung</option>
        </select>
      </div>
      <div class="field span-2">
        <label for="message">Nachricht</label>
        <textarea id="message" rows="6" formControlName="message"></textarea>
      </div>
      <label class="privacy span-2">
        <input type="checkbox" formControlName="privacy">
        <span>Ich habe die Datenschutzhinweise gelesen und stimme der Kontaktaufnahme zu.</span>
      </label>
      @if (submitted && form.invalid) {
        <p class="form-note error" role="alert">Bitte füllen Sie die Pflichtfelder aus und bestätigen Sie den Datenschutz.</p>
      }
      @if (submitted && form.valid) {
        <p class="form-note success">Ihre E-Mail-Anwendung wird geöffnet. Eine Kopie der Anfrage wird an Ihre E-Mail-Adresse eingetragen.</p>
      }
      <button class="btn btn-primary span-2" type="submit">Anfrage unverbindlich abschicken</button>
    </form>
  `,
  styles: [`
    .contact-form {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: clamp(1.25rem, 3vw, 2rem);
    }
    .field {
      display: grid;
      gap: .4rem;
    }
    .span-2 {
      grid-column: 1 / -1;
    }
    label {
      color: var(--navy);
      font-weight: 750;
    }
    input,
    select,
    textarea {
      border: 1px solid var(--border-strong);
      border-radius: 6px;
      color: var(--text);
      font: inherit;
      min-height: 46px;
      padding: .75rem .85rem;
      width: 100%;
    }
    textarea {
      resize: vertical;
    }
    input:focus,
    select:focus,
    textarea:focus {
      border-color: var(--accent);
      outline: 3px solid rgba(168, 139, 99, .22);
    }
    .privacy {
      align-items: flex-start;
      display: flex;
      gap: .7rem;
      line-height: 1.45;
    }
    .privacy input {
      flex: 0 0 auto;
      height: 1.1rem;
      margin-top: .18rem;
      min-height: 0;
      width: 1.1rem;
    }
    .form-note {
      grid-column: 1 / -1;
      margin: 0;
      padding: .8rem;
    }
    .error {
      background: #fff1f2;
      color: #9f1239;
    }
    .success {
      background: #ecfdf5;
      color: #065f46;
    }
    button {
      justify-self: start;
    }
    @media (max-width: 640px) {
      .contact-form {
        grid-template-columns: 1fr;
        padding: 1rem;
      }
      button {
        justify-self: stretch;
      }
    }
  `]
})
export class ContactFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    city: [''],
    requestType: ['', Validators.required],
    message: [''],
    privacy: [false, Validators.requiredTrue]
  });

  submitted = false;

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const subject = encodeURIComponent(`Anfrage: ${value.requestType}`);
    const customerCopy = encodeURIComponent(value.email);
    const body = encodeURIComponent(
      `Name: ${value.name}\nTelefon: ${value.phone}\nE-Mail: ${value.email}\nOrt: ${value.city}\nArt der Anfrage: ${value.requestType}\n\nNachricht:\n${value.message}`
    );

    // TODO: Replace mailto fallback with POST /api/contact once the .NET backend is available.
    // The backend should send the business notification and a separate customer confirmation email.
    window.location.href = `mailto:${contact.email}?cc=${customerCopy}&subject=${subject}&body=${body}`;
  }
}
