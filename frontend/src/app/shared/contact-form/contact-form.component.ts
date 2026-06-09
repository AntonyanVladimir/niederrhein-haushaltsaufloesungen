import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactApiService } from '../../core/api/contact-api.service';

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
      @if (submitState() === 'success') {
        <p class="form-note success">Vielen Dank. Ihre Anfrage wurde versendet. Sie erhalten eine Bestätigung per E-Mail.</p>
      }
      @if (submitState() === 'error') {
        <p class="form-note error" role="alert">Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es später erneut oder rufen Sie direkt an.</p>
      }
      <button class="btn btn-primary span-2" type="submit" [disabled]="submitState() === 'sending'">
        {{ submitState() === 'sending' ? 'Anfrage wird gesendet ...' : 'Anfrage unverbindlich abschicken' }}
      </button>
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
    button:disabled {
      cursor: wait;
      opacity: .72;
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
  private readonly contactApi = inject(ContactApiService);
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
  readonly submitState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  submit(): void {
    this.submitted = true;
    this.submitState.set('idle');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitState.set('sending');

    this.contactApi.send({
      name: value.name,
      phone: value.phone,
      email: value.email,
      city: value.city,
      requestType: value.requestType,
      message: value.message,
      privacyAccepted: value.privacy
    }).subscribe({
      next: () => {
        this.submitState.set('success');
        this.submitted = false;
        this.form.reset();
      },
      error: () => this.submitState.set('error')
    });
  }
}
