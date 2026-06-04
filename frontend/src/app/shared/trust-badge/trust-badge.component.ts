import { Component, input } from '@angular/core';

@Component({
  selector: 'nh-trust-badge',
  standalone: true,
  template: `
    <div class="trust-badge">
      <span aria-hidden="true">✓</span>
      <strong>{{ label() }}</strong>
    </div>
  `,
  styles: [`
    .trust-badge {
      align-items: center;
      background: rgba(255, 255, 255, .1);
      border: 1px solid rgba(255, 255, 255, .18);
      border-radius: 6px;
      color: var(--white);
      display: flex;
      gap: .65rem;
      min-height: 46px;
      padding: .65rem .75rem;
    }
    span {
      color: var(--accent-light);
      font-weight: 900;
    }
    strong {
      font-size: .95rem;
    }
  `]
})
export class TrustBadgeComponent {
  readonly label = input.required<string>();
}
