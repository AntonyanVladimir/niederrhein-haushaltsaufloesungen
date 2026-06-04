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
      border-top: 1px solid rgba(255, 255, 255, .16);
      color: var(--white);
      display: flex;
      gap: .65rem;
      min-height: 44px;
      padding: .7rem 0;
    }
    span {
      color: var(--accent-light);
      flex: 0 0 auto;
      font-weight: 900;
    }
    strong {
      font-size: .92rem;
      line-height: 1.3;
    }
  `]
})
export class TrustBadgeComponent {
  readonly label = input.required<string>();
}
