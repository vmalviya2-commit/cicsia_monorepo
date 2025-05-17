import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shared-card')
export class CardComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 16px;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #333;
    }

    .card-content {
      color: #666;
    }
  `;

  @property({ type: String, attribute: 'title' })
  declare title: string;

  constructor() {
    super();
    this.title = '';
  }

  override render() {
    return html`
      <div class="card">
        ${this.title ? html`<h2 class="card-title">${this.title}</h2>` : ''}
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shared-card': CardComponent;
  }
}
