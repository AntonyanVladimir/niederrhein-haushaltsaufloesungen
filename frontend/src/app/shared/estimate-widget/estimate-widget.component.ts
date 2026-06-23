import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type FillLevel = 'low' | 'normal' | 'high' | 'extreme';
type PropertyType = 'Wohnung' | 'Haus' | 'Keller' | 'Garage' | 'Gewerbe';

interface EstimateResult {
  min: number;
  max: number;
  summary: string[];
}

@Component({
  selector: 'nh-estimate-widget',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="estimate">
      <div class="estimate-copy">
        <p class="eyebrow">KI-gestützte Schätzung</p>
        <h2>Grobe Preisrange vorbereiten</h2>
        <p>Mit wenigen Eckdaten entsteht eine unverbindliche Orientierung. Die Fotoanalyse kann später per KI ergänzt werden.</p>
      </div>

      <div class="estimate-body">
        <form class="estimate-form" [formGroup]="form" (ngSubmit)="calculate()" novalidate>
          <div class="field">
            <label for="propertyType">Objektart</label>
            <select id="propertyType" formControlName="propertyType">
              @for (type of propertyTypes; track type) {
                <option [value]="type">{{ type }}</option>
              }
            </select>
          </div>

          <div class="field">
            <label for="areaSqm">Fläche in m²</label>
            <input id="areaSqm" type="number" min="5" max="500" inputmode="numeric" formControlName="areaSqm">
          </div>

          <div class="field">
            <label for="floor">Etage</label>
            <input id="floor" type="number" min="0" max="12" inputmode="numeric" formControlName="floor">
          </div>

          <div class="field">
            <label for="parkingDistance">Parkweg</label>
            <select id="parkingDistance" formControlName="parkingDistance">
              <option value="near">Direkt am Objekt</option>
              <option value="medium">Bis ca. 30 Meter</option>
              <option value="far">Weiter als 30 Meter</option>
            </select>
          </div>

          <fieldset class="choice-group span-2">
            <legend>Aufzug vorhanden?</legend>
            <label>
              <input type="radio" formControlName="hasElevator" [value]="true">
              <span>Ja</span>
            </label>
            <label>
              <input type="radio" formControlName="hasElevator" [value]="false">
              <span>Nein</span>
            </label>
          </fieldset>

          <fieldset class="choice-group span-2">
            <legend>Füllgrad</legend>
            @for (level of fillLevels; track level.value) {
              <label>
                <input type="radio" formControlName="fillLevel" [value]="level.value">
                <span>{{ level.label }}</span>
              </label>
            }
          </fieldset>

          <div class="field span-2">
            <label for="photos">Fotos optional</label>
            <input id="photos" type="file" accept="image/*" multiple (change)="selectFiles($event)">
            <p class="hint">Bis zu 3 Fotos. Aktuell nur UI-Vorbereitung, noch kein Upload.</p>
            @if (selectedFileNames().length > 0) {
              <ul class="file-list">
                @for (fileName of selectedFileNames(); track fileName) {
                  <li>{{ fileName }}</li>
                }
              </ul>
            }
          </div>

          @if (submitted() && form.invalid) {
            <p class="form-note error span-2" role="alert">Bitte geben Sie eine realistische Fläche an.</p>
          }

          <button class="btn btn-primary span-2" type="submit">Preisrange grob berechnen</button>
        </form>

        @if (estimate(); as result) {
          <aside class="estimate-result" aria-live="polite">
            <span class="result-label">Unverbindliche Orientierung</span>
            <strong>{{ result.min }}-{{ result.max }} EUR</strong>
            <ul>
              @for (item of result.summary; track item) {
                <li>{{ item }}</li>
              }
            </ul>
            <p>Für ein verbindliches Angebot bleibt eine Besichtigung oder manuelle Prüfung erforderlich.</p>
          </aside>
        }
      </div>
    </section>
  `,
  styles: [`
    .estimate {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
      display: grid;
      gap: 1.25rem;
      grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
      padding: clamp(1.25rem, 3vw, 2rem);
    }
    .estimate-copy h2,
    .estimate-copy p {
      margin-bottom: 0;
    }
    .estimate-body {
      display: grid;
      gap: 1rem;
    }
    .estimate-form {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .field {
      display: grid;
      gap: .4rem;
    }
    .span-2 {
      grid-column: 1 / -1;
    }
    label,
    legend {
      color: var(--navy);
      font-weight: 750;
    }
    input,
    select {
      border: 1px solid var(--border-strong);
      border-radius: 6px;
      color: var(--text);
      font: inherit;
      min-height: 46px;
      padding: .75rem .85rem;
      width: 100%;
    }
    input:focus,
    select:focus {
      border-color: var(--accent);
      outline: 3px solid rgba(168, 139, 99, .22);
    }
    .choice-group {
      border: 1px solid var(--border);
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: .7rem;
      margin: 0;
      padding: .85rem;
    }
    .choice-group legend {
      padding: 0 .25rem;
    }
    .choice-group label {
      align-items: center;
      background: var(--light);
      border: 1px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      gap: .45rem;
      min-height: 40px;
      padding: .55rem .75rem;
    }
    .choice-group input {
      min-height: 0;
      width: auto;
    }
    .hint {
      font-size: .9rem;
      margin: 0;
    }
    .file-list {
      color: var(--muted);
      margin: 0;
      padding-left: 1.1rem;
    }
    .form-note {
      margin: 0;
      padding: .8rem;
    }
    .error {
      background: #fff1f2;
      color: #9f1239;
    }
    .estimate-result {
      background: var(--light);
      border-left: 4px solid var(--accent);
      display: grid;
      gap: .55rem;
      padding: 1rem;
    }
    .result-label {
      color: var(--muted);
      font-size: .82rem;
      font-weight: 850;
      text-transform: uppercase;
    }
    .estimate-result strong {
      color: var(--navy);
      font-size: clamp(1.65rem, 3vw, 2.35rem);
      line-height: 1;
    }
    .estimate-result ul {
      margin: 0;
      padding-left: 1.1rem;
    }
    .estimate-result p {
      margin: 0;
    }
    @media (max-width: 900px) {
      .estimate,
      .estimate-form {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 520px) {
      .estimate {
        padding: 1rem;
      }
      .choice-group {
        display: grid;
      }
      .choice-group label {
        width: 100%;
      }
    }
  `]
})
export class EstimateWidgetComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly propertyTypes: PropertyType[] = ['Wohnung', 'Haus', 'Keller', 'Garage', 'Gewerbe'];
  readonly fillLevels: { value: FillLevel; label: string }[] = [
    { value: 'low', label: 'Wenig' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Viel' },
    { value: 'extreme', label: 'Sehr voll' }
  ];

  readonly form = this.formBuilder.nonNullable.group({
    propertyType: ['Wohnung' as PropertyType, Validators.required],
    areaSqm: [60, [Validators.required, Validators.min(5), Validators.max(500)]],
    floor: [0, [Validators.min(0), Validators.max(12)]],
    hasElevator: [false],
    parkingDistance: ['near' as 'near' | 'medium' | 'far'],
    fillLevel: ['normal' as FillLevel]
  });

  readonly submitted = signal(false);
  readonly selectedFileNames = signal<string[]>([]);
  readonly estimate = signal<EstimateResult | null>(null);
  readonly fileCount = computed(() => this.selectedFileNames().length);

  selectFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []).slice(0, 3);
    this.selectedFileNames.set(files.map((file) => file.name));
  }

  calculate(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.estimate.set(null);
      return;
    }

    const value = this.form.getRawValue();
    const area = value.areaSqm;
    const baseByType: Record<PropertyType, number> = {
      Wohnung: 18,
      Haus: 20,
      Keller: 16,
      Garage: 14,
      Gewerbe: 22
    };
    const fillMultiplier: Record<FillLevel, number> = {
      low: .75,
      normal: 1,
      high: 1.35,
      extreme: 1.85
    };
    const parkingMultiplier = value.parkingDistance === 'far' ? 1.18 : value.parkingDistance === 'medium' ? 1.08 : 1;
    const floorMultiplier = value.hasElevator ? 1 : 1 + Math.min(value.floor, 5) * .06;
    const minimumByType: Record<PropertyType, number> = {
      Wohnung: 450,
      Haus: 650,
      Keller: 250,
      Garage: 220,
      Gewerbe: 700
    };

    const calculated = area * baseByType[value.propertyType] * fillMultiplier[value.fillLevel] * parkingMultiplier * floorMultiplier;
    const midpoint = Math.max(minimumByType[value.propertyType], calculated);
    const min = this.roundToFifty(midpoint * .82);
    const max = this.roundToFifty(midpoint * 1.22);

    this.estimate.set({
      min,
      max,
      summary: [
        `${value.propertyType}, ca. ${area} m²`,
        `Füllgrad: ${this.fillLevels.find((level) => level.value === value.fillLevel)?.label}`,
        value.hasElevator ? 'Aufzug berücksichtigt' : `Etage ${value.floor} ohne Aufzug berücksichtigt`,
        `${this.fileCount()} Foto(s) ausgewählt`
      ]
    });
  }

  private roundToFifty(value: number): number {
    return Math.max(150, Math.round(value / 50) * 50);
  }
}
